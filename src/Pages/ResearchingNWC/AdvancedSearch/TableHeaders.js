function processTableData(response, newArray, categories) {
  const tableData = response.data.map((person, index) => {
    const tableItem = {
      '#': index + 1,
      'Name': `${person.attributes.last_name}, ${person.attributes.first_name}`,
    };

    newArray.forEach((element) => {
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
          } else {
            nestedValuesArray.push(convertBooleanToString(nestedValue[property]));
          }
        } else {
          nestedValuesArray.push(convertBooleanToString(nestedValue[property]));
        }
      });

      function convertBooleanToString(value) {
        if (value === true || value === "true") {
          return "yes";
        } else if (value === false || value === "false") {
          return "no";
        } else {
          return value;
        }
      }

      // Remove duplicate items
      const uniqueValuesArray = [...new Set(nestedValuesArray)];

      // Add bullet points to all items
      if (uniqueValuesArray.length > 0) {
        tableItem[formattedKey] = uniqueValuesArray
          .map(value => `• ${value}`)
          .join('\n'); // Line breaks between items
      } else {
        tableItem[formattedKey] = '';
      }
    });

    return tableItem;
  });

  return tableData;
}

export { processTableData };
