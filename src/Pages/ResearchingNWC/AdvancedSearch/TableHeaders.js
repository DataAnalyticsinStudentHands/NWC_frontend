function processTableData(response, newArray, categories) {
  // Function to modify the display name (remove trailing 's')
  const formatDisplayName = (category) => {
    return category.endsWith('s') ? category.slice(0, -1) : category; // Remove 's' if it ends with 's'
  };

  const tableData = response.data.map((person, index) => {
    const tableItem = {
      '#': index + 1,
      'Name': `${person.attributes.last_name}, ${person.attributes.first_name}` || 'N/A', // Default to "N/A" if name is empty
    };

    let hasTotalPopulation = false;
    let hasMedianHouseholdIncome = false;

    newArray.forEach((element) => {
      if (element === 'residence_in_1977s') {
        const residenceData = person.attributes.residence_in_1977s.data[0]?.attributes || {};
        const totalPopulation = residenceData.total_population || 'N/A';
        const medianHouseholdIncome = residenceData.median_household_income || 'N/A';
        
        hasTotalPopulation = totalPopulation !== 'N/A';
        hasMedianHouseholdIncome = medianHouseholdIncome !== 'N/A';
        
        if (categories.includes('total_population'))
          tableItem[formatDisplayName('total_population')] = convertBooleanToString(totalPopulation);
        if (categories.includes('median_household_income'))
          tableItem[formatDisplayName('median_household_income')] = convertBooleanToString(medianHouseholdIncome);
      } else if (element === 'organizational_politicals') {
        const organizations = person.attributes.organizational_politicals.data[0]?.attributes.organizational_and_political || [];
        tableItem[formatDisplayName('organizational_politicals')] = organizations.length > 0 
          ? organizations.map(org => org.organizational_and_political).join(', ') 
          : 'N/A'; 
      } else {
        const formattedKey = formatDisplayName(element.replace(/_/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase()));
        const nestedProperties = element.split('.');
        let nestedValue = person.attributes;
        let nestedValuesArray = [];

        nestedProperties.forEach((property) => {
          if (nestedValue && property in nestedValue) {
            nestedValue = nestedValue[property];
            if (Array.isArray(nestedValue?.data)) {
              nestedValue = nestedValue.data.map(item => item.attributes);
            }
          } else {
            nestedValue = 'N/A';
          }
        });

        if (Array.isArray(nestedValue)) {
          nestedValuesArray = nestedValue.flatMap(item => Object.values(item));
        } else {
          nestedValuesArray.push(convertBooleanToString(nestedValue || 'N/A'));
        }

        const uniqueValuesArray = [...new Set(nestedValuesArray)];
        // Removed bullet points and new line addition
        tableItem[formattedKey] = uniqueValuesArray.length > 1 
          ? uniqueValuesArray.join(', ')  // Join without bullet points or new lines
          : uniqueValuesArray[0] || 'N/A';
      }
    });

    if (hasTotalPopulation || hasMedianHouseholdIncome) {
      tableItem['City State'] = person.attributes.residence_in_1977s.data[0]?.attributes.city_state || 'N/A';
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
    return value || 'N/A'; 
  }
}

export { processTableData };
