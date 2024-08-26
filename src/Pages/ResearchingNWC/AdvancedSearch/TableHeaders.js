function processTableData(response, newArray, categories) {
  const tableData = response.data.map((person, index) => {
    const tableItem = {
      '#': index + 1,
      'Name': `${person.attributes.last_name}, ${person.attributes.first_name}`,
    };

    // Initialize flags for checking presence of values
    let hasTotalPopulation = false;
    let hasMedianHouseholdIncome = false;

    newArray.forEach((element) => {
      if (element === 'residence_in_1977s') {
        const residenceData = person.attributes.residence_in_1977s.data[0].attributes || {};

        // Extract Total Population and Median Household Income
        const totalPopulation = residenceData.total_population || '';
        const medianHouseholdIncome = residenceData.median_household_income || '';

        // Set flags based on presence of values
        hasTotalPopulation = !!totalPopulation;
        hasMedianHouseholdIncome = !!medianHouseholdIncome;

        if (categories.includes('total_population'))
        tableItem['Total Population'] = convertBooleanToString(totalPopulation);
        if (categories.includes('median_household_income'))
        tableItem['Median Household Income'] = convertBooleanToString(medianHouseholdIncome);
      } else {
        // General handling for other attributes
        const formattedKey = element.replace(/_/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());

        const nestedProperties = element.split('.');
        let nestedValue = person.attributes;
        let nestedValuesArray = [];

        nestedProperties.forEach((property) => {
          if (
            typeof nestedValue[property] === 'object' &&
            property in nestedValue &&
            nestedValue[property] !== null
          ) {
            if (Array.isArray(nestedValue[property].data)) {
              const filteredValues = nestedValue[property].data.map((item) => {
                const attributes = item.attributes;
                const filteredAttributes = Object.entries(attributes).reduce((acc, [key, value]) => {
                  
                  if (key !== 'createdAt' && key !== 'updatedAt' && categories.includes(key)) {
                    acc[key] = convertBooleanToString(value);
                  }
                  return acc;
                }, {});
                return Object.values(filteredAttributes);
              }).flat(); // Flatten arrays directly here
              nestedValuesArray.push(...filteredValues);
            } 
          } else {
            nestedValuesArray.push(convertBooleanToString(nestedValue[property]));
          }
        });

        // Remove duplicate items
        const uniqueValuesArray = [...new Set(nestedValuesArray)];

        // Add bullet points to all items
        if (uniqueValuesArray.length > 1) {
          tableItem[formattedKey] = uniqueValuesArray
            .map(value => `• ${value}`)
            .join('\n'); // Line breaks between items
        } else if (uniqueValuesArray.length === 1) {
          tableItem[formattedKey] = uniqueValuesArray[0];
        } else {
          tableItem[formattedKey] = '';
        }
      }
    });

    // Add City State column if either Total Population or Median Household Income are present
    if (hasTotalPopulation || hasMedianHouseholdIncome) {
      tableItem['City State'] = person.attributes.residence_in_1977s.data[0].attributes.city_state || '';
    }

    return tableItem;
  });

  return tableData;
}

function convertBooleanToString(value) {
  if (value === true || value === "true") {
    return "yes";
  } else if (value === false || value === "false") {
    return "no";
  } else {
    return value;
  }
}

export { processTableData };
