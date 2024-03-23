import { useEffect, useState, useRef } from "react";
import "./listOf.css";
import { CSVLink } from "react-csv";
import { StateSelect } from '../../Components/StateSelect/StateSelect'

var currentData = "default";

function ListOf(props) {
	let dataType = props.dataType;
	const [listData, setListData] = useState([]);
	const [selectedValue, setSelectedValue] = useState(null);
	const [stateChoices, setStateChoices] = useState([]);
	const [activeLetter, setActiveLetter] = useState(null);
	const [currentOffSet, setCurrentOffSet] = useState(0);
	const [input, setInput] = useState("");
	const [filter, setFilter] = useState(false);
	const [searchBar, setSearchBar] = useState(false);
	const listOfData = useRef([]);

	const alphabet = "abcdefghijklmnopqrstuvwxyz";

	useEffect(() => {
		if (dataType === "Participants") {
			fetch(
				[
					process.env.REACT_APP_API_URL,
					"api/list-of-participants?sort[0]=LastName",
				].join("/")
			)
				.then((res) => res.json())
				.then((data) => {
					listOfData.current = data.data;
					setListData(data.data);
					setFilter(true);
				})
				.catch((err) => console.log(err));
		}

		if (dataType === "Organizations") {
			if (currentData === "search") {
				fetch(
					[
						process.env.REACT_APP_API_URL,
						`api/organizational-and-politicals?filters[organizational_and_political][$containsi]=${input}&sort[0]=organizational_and_political:asc`,
					].join("/")
				)
					.then((response) => response.json())
					.then((data) => {
						listOfData.current = data.data;
						setListData(data.data);
						setSearchBar(true);
					})
					.catch((err) => console.log(err));
			} else {
				fetch(
					[
						process.env.REACT_APP_API_URL,
						"api/organizational-and-politicals?sort[0]=organizational_and_political:asc",
					].join("/")
				)
					.then((res) => res.json())
					.then((data) => {
						listOfData.current = data.data;
						setListData(data.data);
						setSearchBar(true);
					})
					.catch((err) => console.log(err));
			}
		}
	}, [currentOffSet]); // eslint-disable-line

	function setOffset() {
		if (currentOffSet === 0) {
			setCurrentOffSet(1);
		} else {
			setCurrentOffSet(0);
		}
	}

	function search() {
		currentData = "search";
		setOffset();
	}

	const handleChange = (e) => {
		let selectedValues = e.map((e) => {
			return e.label;
		});
		setSelectedValue(selectedValues);
		const list = listOfData.current
			.filter((fullList) =>
				selectedValues.includes(fullList.attributes.States)
			)
			.map((p) => {
				return p;
			});
		setStateChoices(list);
		selectedValues.length === 0
			? setListData(listOfData.current)
			: setListData(list);
	};

	function handleLetterChange(letter) {
		setActiveLetter(letter);
		if (letter === "reset") {
			setListData(listOfData.current);
			return;
		}
		if (dataType === "Participants") {
			const letterList =
				stateChoices.length === 0
					? listOfData.current.filter((stateList) =>
							letter.includes(
								stateList.attributes.LastName[0].toLowerCase()
							)
					)
					: stateChoices.filter((stateList) =>
							letter.includes(
								stateList.attributes.LastName[0].toLowerCase()
							)
					);
			setListData(letterList);
		}
		if (dataType === "Organizations") {
			const letterList =
				letter === null
					? listOfData.current
					: listOfData.current.filter((orgList) =>
							letter.includes(
								orgList.attributes.organizational_and_political[0].toLowerCase()
							)
					);
			setListData(letterList);
		}
	}

	return (
		<div className="listOf">
			<h1>List of NWC {dataType}</h1>
			<div className="listOfOptions">
				{searchBar ? (
					<div className="organizationSearch">
						<div className="organizationSearch_bar">
							<input
								placeholder="Search Organization by Name"
								value={input}
								onChange={(e) => setInput(e.target.value)}
							/>
							<button
								className="organizationSearch_icon"
								onClick={() => search()}></button>
						</div>
					</div>
				) : (
					""
				)}
				{/* FILTER */}
				{filter ? (
					<div className="listOfFilter">
						<p>Filter by State: </p>
						<StateSelect  css={'participants-select'} onSelect={handleChange} selectedOptions={selectedValue ? selectedValue.find(
							(obj) => obj.value === selectedValue
						) : null}/>
					</div>
				) : (
					""
				)}
				<CSVLink
					data={
						dataType === "Participants"
							? [
									["Last Name", "First Name", "State"],
									...listData.map((p) => [
										p.attributes.LastName,
										p.attributes.FirstName,
										p.attributes.States,
									]),
							]
							: [
									["Organization"],
									...listData.map((p) => [
										p.attributes
											.organizational_and_political,
									]),
							]
					}
					filename={
						dataType === "Participants"
							? `listOfParticipants-${Date.now()}.csv`
							: `listOfOrganizations-${Date.now()}.csv`
					}>
					Download CSV
				</CSVLink>
			</div>
			<div className="alphabetList">
				{alphabet.split("").map((letter, index) => {
					return (
						<>
							<p
								className={
									activeLetter === letter
										? "activeLetter"
										: "letterSort"
								}
								key={Math.random()}
								onClick={() => handleLetterChange(letter)}>
								{letter}
							</p>
							{index !== alphabet.length - 1 && (
								<span className="letterSeperator">-</span>
							)}
						</>
					);
				})}
			</div>

			{/* LIST */}
			<div className="listOfList">
				<ul className="listOfContainer">
					{listData.length === 0
						? "No data found."
						: dataType === "Participants"
						? listData.map((participant) => (
								<ul key={Math.random()}>
									{participant.attributes.LastName},{" "}
									{participant.attributes.FirstName},{" "}
									{participant.attributes.States}
								</ul>
						))
						: listData.map((organization) => (
								<ul key={Math.random()}>
									{
										organization.attributes
											.organizational_and_political
									}
								</ul>
						))}
				</ul>
			</div>
		</div>
	);
}

export default ListOf;
