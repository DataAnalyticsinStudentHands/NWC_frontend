function processTableData(response, newArray, categories) {
    const tableData = response.data.map((person, index) => {
      const tableItem = {
        '#': index+1,
        'Name': `${person.attributes.last_name}, ${person.attributes.first_name}`,
      };
  
      newArray.forEach((element) => {
        const formattedKey = element.replace(/_/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
  
        const nestedProperties = element.split('.');
        let nestedValue = person.attributes;
  
        function flattenArray(arr, result = []) {
          for (const item of arr) {
            if (Array.isArray(item)) {
              flattenArray(item, result);
            } else {
              result.push(item);
            }
          }
          return result;
        }
  
        let nestedValuesArray = [];
  
        nestedProperties.forEach((property) => {
          if (
            typeof nestedValue[property] === 'object' &&
            property in nestedValue &&
            nestedValue[property] !== null
          ) {
            if (typeof nestedValue[property].data.attributes === 'object') {
              nestedValuesArray.push(nestedValue[property].data.attributes[property])
            } else {
              const filteredValues = nestedValue[property].data.map((item) => {
                const attributes = item.attributes;
                const filteredAttributes = Object.entries(attributes).reduce((acc, [key, value]) => {
                  if (key !== 'createdAt' && key !== 'updatedAt' && categories.includes(key)) {
                    acc[key] = convertBooleanToString(value);
                  }
                  return acc;
                }, {});
  
                return Object.values(filteredAttributes);
              });
  
              nestedValuesArray.push(...filteredValues);
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
  
        const flatNestedValue = flattenArray(nestedValuesArray);
        const uniqueValues = [...new Set(flatNestedValue)];
  
        tableItem[formattedKey] = uniqueValues;
      });
  
      return tableItem;
    });
  
    return tableData;
  }
  
  export { processTableData };