// src/pages/ListPage.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./ListPage.css";
import "../Components/Buttons/submit.css"; // <-- brings in .corrections_submit button style
import BackToButton from "../Components/Buttons/backTo";
import { CSVLink } from "react-csv";
import Select from "react-select";
import { useParams, Navigate } from "react-router-dom";
import stateTerritories from "../assets/stateTerritories.json";

const LABELS = {
  participants: { dataType: "Participants", h1Title: "Participants" },
  commissioners: { dataType: "Commissioners", h1Title: "Commissioners" },
  organizations: { dataType: "Organizations", h1Title: "Organizations" },
};

const BACK_DEST = {
  Participants: { name: "Discover", link: "/discover" },
  Commissioners: { name: "Discover", link: "/discover" },
  Organizations: { name: "Researching NWC", link: "/researching NWC" },
};

const CONFIG = {
  Participants: {
    endpoint: "api/list-of-participants",
    sortQS: "sort[0]=LastName",
    alphaGetter: (item) =>
      (item && item.attributes && item.attributes.LastName) || "",
    filterLabel: "State",
    filterAttr: "States",
    buildFilterOptions: () =>
      Object.values(stateTerritories).map((s) => ({
        value: s.stateCode,
        label: s.state,
      })),
    showFilter: true,
    showSearch: false,
    csvHeader: ["Last Name", "First Name", "State"],
    csvRow: (p) => [
      p.attributes.LastName,
      p.attributes.FirstName,
      p.attributes.States,
    ],
    filenameBase: "listOfParticipants",
    itemText: (p) =>
      `${p.attributes.LastName}, ${p.attributes.FirstName}, ${p.attributes.States}`,
  },
  Commissioners: {
    endpoint: "api/list-of-commissioners",
    sortQS: "sort[0]=LastName",
    alphaGetter: (item) =>
      (item && item.attributes && item.attributes.LastName) || "",
    filterLabel: "Commissioner Role",
    filterAttr: "Commissioner",
    buildFilterOptions: (rows) => {
      const roles = new Set();
      (rows || []).forEach((r) => {
        const raw = (r && r.attributes && r.attributes.Commissioner) || "";
        raw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .forEach((role) => roles.add(role));
      });
      return Array.from(roles)
        .sort()
        .map((role) => ({ value: role, label: role }));
    },
    showFilter: true,
    showSearch: false,
    csvHeader: ["Last Name", "First Name", "Commissioner Role"],
    csvRow: (c) => [
      c.attributes.LastName,
      c.attributes.FirstName,
      c.attributes.Commissioner,
    ],
    filenameBase: "listOfCommissioners",
    itemText: (c) =>
      `${c.attributes.LastName}, ${c.attributes.FirstName}, ${c.attributes.Commissioner}`,
  },
  Organizations: {
    endpoint: "api/organizational-and-politicals",
    sortQS: "sort[0]=organizational_and_political:asc",
    alphaGetter: (item) =>
      (item &&
        item.attributes &&
        item.attributes.organizational_and_political) ||
      "",
    filterLabel: null,
    filterAttr: null,
    buildFilterOptions: () => [],
    showFilter: false,
    showSearch: true,
    csvHeader: ["Organization"],
    csvRow: (o) => [o.attributes.organizational_and_political],
    filenameBase: "listOfOrganizations",
    itemText: (o) => o.attributes.organizational_and_political,
  },
};

export default function ListPage({ type: typeProp }) {
  const { type: typeFromRoute } = useParams() || {};
  const typeKey = String(typeProp || typeFromRoute || "").toLowerCase();

  if (!LABELS[typeKey]) {
    return React.createElement(Navigate, { to: "/discover", replace: true });
  }

  const { dataType, h1Title } = LABELS[typeKey];
  const cfg = useMemo(() => CONFIG[dataType], [dataType]);
  const back = BACK_DEST[dataType] || BACK_DEST.Participants;
  const filterId = `filter-${dataType.toLowerCase()}`;

  const [listData, setListData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);
  const [filteredSubset, setFilteredSubset] = useState([]);
  const [activeLetter, setActiveLetter] = useState(null);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("default");
  const listOfData = useRef([]);

  useEffect(() => {
    const base = process.env.REACT_APP_API_URL;
    if (!cfg || !base) return;

    const url =
      dataType === "Organizations"
        ? (() => {
            const qs =
              mode === "search" && input.trim()
                ? `filters[organizational_and_political][$containsi]=${encodeURIComponent(
                    input.trim(),
                  )}&${cfg.sortQS}`
                : cfg.sortQS;
            return [base, `${cfg.endpoint}?${qs}`].join("/");
          })()
        : [base, `${cfg.endpoint}?${cfg.sortQS}`].join("/");

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const rows = (data && data.data) || [];
        listOfData.current = rows;
        setListData(rows);
        setFilterOptions(cfg.buildFilterOptions(rows));
        setSelectedValue(null);
        setFilteredSubset([]);
        setActiveLetter(null);
      })
      .catch(console.log);
  }, [cfg, dataType, mode, input]);

  useEffect(() => {
    if (
      dataType === "Organizations" &&
      mode === "search" &&
      input.trim() === ""
    ) {
      setMode("default");
    }
  }, [dataType, mode, input]);

  function search() {
    setMode("search");
  }

  function handleChange(selected) {
    setSelectedValue(selected);
    // clear any active letter whenever dropdown filter changes
    setActiveLetter(null);

    if (!selected || !selected.length || !cfg.filterAttr) {
      setListData(listOfData.current);
      setFilteredSubset([]);
      return;
    }

    const selectedLabels = new Set(selected.map((o) => o.label));
    const next = listOfData.current.filter((item) => {
      const val =
        (item && item.attributes && item.attributes[cfg.filterAttr]) || "";
      if (dataType === "Commissioners") {
        const roles = val
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        return roles.some((r) => selectedLabels.has(r));
      }
      return selectedLabels.has(val);
    });

    setFilteredSubset(next);
    setListData(next);
  }

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const letters = ["All", ...alphabet.split("")];

  function handleLetterChange(letter) {
    setActiveLetter(letter);
    const base =
      filteredSubset.length > 0 ? filteredSubset : listOfData.current;
    const firstChar = (item) =>
      (cfg.alphaGetter(item) || "").charAt(0).toLowerCase();
    const next = base.filter((it) => firstChar(it) === letter);
    setListData(next);
  }

  // NEW: clear only the letter filter (preserve dropdown filter if any)
  function clearLetterFilter() {
    setActiveLetter(null);
    const base =
      filteredSubset.length > 0 ? filteredSubset : listOfData.current;
    setListData(base);
  }

  const csvData = [cfg.csvHeader, ...listData.map(cfg.csvRow)];
  const csvFilename = `${cfg.filenameBase}-${Date.now()}.csv`;

  const h = React.createElement;

  return h(
    "div",
    { className: "participants" },
    h(
      "p",
      { className: "backToDiscover" },
      h(BackToButton, { name: back.name, link: back.link }),
    ),
    h(
      "div",
      { className: "listOf" },
      h("h1", null, `List of NWC ${h1Title}`),

      // Options row
      h(
        "div",
        { className: "listOfOptions" },

        // Search (orgs only)
        cfg === CONFIG.Organizations
          ? h(
              "div",
              { className: "organizationSearch" },
              h(
                "div",
                { className: "organizationSearch_bar" },
                h("input", {
                  placeholder: "Search Organization by Name",
                  value: input,
                  onChange: (e) => setInput(e.target.value),
                }),
                h("button", {
                  className: "organizationSearch_icon",
                  onClick: search,
                }),
              ),
            )
          : null,

        // Filter (States or Commissioner Role)
        cfg.showFilter
          ? h(
              "div",
              { className: "listOfFilter" },
              h(
                "label",
                { className: "filterLabel", htmlFor: filterId },
                `Filter by ${cfg.filterLabel}:`,
              ),
              h(Select, {
                inputId: filterId, // <-- ties the label to the input
                isMulti: true,
                options: filterOptions,
                onChange: handleChange,
                value: selectedValue,
                placeholder:
                  cfg.filterLabel === "State"
                    ? "State/Territory"
                    : cfg.filterLabel,
                className: "participants-select",
                classNamePrefix: "select",
              }),
            )
          : null,

        // CSV download
        h(
          CSVLink,
          {
            data: csvData,
            filename: csvFilename,
            className: "btn btn--primary csv-download",
            role: "button",
          },
          "Download CSV",
        ),
      ),

      // Alphabet (full-width grid with "All" at the start)
      h(
        "div",
        {
          className: "alphabetList",
          role: "group",
          "aria-label": "Alphabet filter",
        },
        letters.map((token) =>
          h(
            "button",
            {
              key: `alpha-${token}`,
              type: "button",
              className:
                "letterBtn " +
                (activeLetter === token || (!activeLetter && token === "All") // show All as active when nothing is selected
                  ? "activeLetter"
                  : "letterSort"),
              onClick: () =>
                token === "All"
                  ? clearLetterFilter()
                  : handleLetterChange(token),
              "aria-pressed":
                activeLetter === token || (!activeLetter && token === "All"),
            },
            token,
          ),
        ),
      ),
      // List
      h(
        "div",
        { className: "listOfList" },
        h(
          "ul",
          { className: "listOfContainer" },
          listData.length === 0
            ? "No data found."
            : listData.map((row, i) =>
                h(
                  "ul",
                  { key: row && row.id ? row.id : `${cfg.filenameBase}-${i}` },
                  cfg.itemText(row),
                ),
              ),
        ),
      ),
    ),
  );
}
