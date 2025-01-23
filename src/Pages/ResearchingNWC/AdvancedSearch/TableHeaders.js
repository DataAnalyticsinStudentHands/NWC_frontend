function processTableData(response, newArray, categories, allValues) {
  // Function to modify the display name (remove trailing 's')
  const formatDisplayName = (category) => {
    if (category === 'Political Parties') {
      // Return 'Political Party' instead of modifying the name
      return 'Political Parties';
    }
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
      if (element === 'residence_in_1977s' && (categories.includes('total_population') || categories.includes('median_household_income'))) {
        const residenceData = person.attributes.residence_in_1977s.data[0]?.attributes || {};
        const totalPopulation = residenceData.total_population || 'N/A';
        const medianHouseholdIncome = residenceData.median_household_income || 'N/A';

        hasTotalPopulation = totalPopulation !== 'N/A';
        hasMedianHouseholdIncome = medianHouseholdIncome !== 'N/A';

        if (categories.includes('total_population') && allValues.includes(totalPopulation))
          tableItem[formatDisplayName('total_population')] = convertBooleanToString(totalPopulation);
        if (categories.includes('median_household_income') && allValues.includes(medianHouseholdIncome))
          tableItem[formatDisplayName('median_household_income')] = convertBooleanToString(medianHouseholdIncome);
      } else if (element === 'organizational_politicals' && categories.includes('organizational_and_political')) {
        const organizations = person.attributes.organizational_politicals.data.flatMap(item => 
          item?.attributes?.organizational_and_political || []
        );
        // If organizations is an array, filter and match with allValues
        if (Array.isArray(organizations)) {
          const matchingOrganizations = organizations.filter(org => {
            return allValues.some(value => 
              org.toLowerCase().includes(value.toLowerCase()) // Matching against the organization name
            );
          });
      
          // If matching organizations exist, join them with a comma, otherwise leave it empty
          tableItem[formatDisplayName('Organizations')] = matchingOrganizations.length > 0 
            ? matchingOrganizations.join(', ') 
            : 'N/A'; // Do not show 'N/A' if no match, leave it empty
        } else {
          // If organizations is not an array, check if the single organization matches any value in allValues
          const organization = person.attributes.organizational_politicals.data[0]?.attributes.organizational_and_political;
        
          // Only add the organization if it matches any value in allValues
          if (organization && allValues.some(value => organization.toLowerCase().includes(value.toLowerCase()))) {
            tableItem[formatDisplayName('Organizations')] = organization;
          } else {
            tableItem[formatDisplayName('Organizations')] = 'N/A'; // Leave it empty if no match
          }
        }
      }
      else if (element === 'leadership_in_organizations' && categories.includes('specific_role')) {
        const leadership = person.attributes.leadership_in_organizations.data.flatMap(item => ({
            organization: item?.attributes?.organization || '',
            role: item?.attributes?.specific_role || '' // Extract role attribute
        }));
      
        // Filter leadership items where the organization matches allValues and return the role
        const matchingRoles = leadership
          .filter(item => allValues.some(value => item.role.toLowerCase().includes(value.toLowerCase())))
          .map(item => item.role); // Map to role after filtering
      
        // Remove duplicates by converting to a Set and back to an array
        const uniqueRoles = [...new Set(matchingRoles)];
      
        // Populate the table item with roles or leave empty if no match
        tableItem[formatDisplayName('Leadership Specific Role')] = uniqueRoles.length > 0
          ? uniqueRoles.join(', ')
          : 'N/A'; // Leave empty if no match
      }
      else if (element === 'last_name') {
        // Extract and flatten all organizational data
        const organizations = person.attributes.organizational_politicals.data.flatMap(item => 
          item?.attributes?.organizational_and_political || []
        );
      
        // Collect all organizations into a single array
        const allOrganizations = Array.isArray(organizations) ? organizations : [];
      
        // Join all organizations with a comma and display them, or leave it empty if none
        tableItem[formatDisplayName('Organizations')] = allOrganizations.length > 0 
          ? allOrganizations.join(', ') 
          : ''; // Leave it empty if no organizations are found
      }

      else if (element === 'leadership_in_organizations' && categories.includes('last_name')) {
        // Extract and flatten all organizational data
        const organizations = person.attributes.leadership_in_organizations.data.flatMap(item => 
          item?.attributes?.organization || []
        );
        // Collect all organizations into a single array
        const allOrganizations = Array.isArray(organizations) ? organizations : [];
        // Only create the tableItem if there are organizations
        if (allOrganizations.length > 0) {
          tableItem[formatDisplayName('Leadership Organizations')] = allOrganizations.join(', ');
        }
      }

      else if (element === 'leadership_in_organizations' && categories.includes('organization')) {
        const leadership = person.attributes.leadership_in_organizations.data.flatMap(item => ({
          organization: item?.attributes?.organization || '',
          role: item?.attributes?.role || ''
        }));
      
        // Filter leadership items where the organization matches allValues
        const matchingLeadership = leadership.filter(item =>
          allValues.some(value => item.organization.toLowerCase().includes(value.toLowerCase()))
        );
      
        // Format the result as "Role of Organization"
        const formattedLeadership = matchingLeadership.map(item => 
          `${item.role} of ${item.organization}`
        );
      
        // Populate the table item with formatted leadership positions or leave empty if no match
        tableItem[formatDisplayName('Leadership Position in Organization')] = formattedLeadership.length > 0
          ? formattedLeadership.join(', ')
          : 'N/A'; // Leave empty if no match
      }
  
      else if ((element === 'political_office_helds' && categories.includes('start_year')) || (element === 'educations' && categories.includes('year'))) {
          // Select the appropriate data array for political_office_helds or educations
          const decadeDataArray = (element === 'political_office_helds') 
            ? person.attributes.political_office_helds.data || [] 
            : person.attributes.educations.data || []; // Use appropriate data based on the element
                
          // Define the year ranges you want to check
          const yearRanges = [
            { label: 'Before 1977', range: [null, 1976] },  // 1977 not inclusive
            { label: 'After 1977', range: [1978, null] },   // 1977 not inclusive
            { label: 'Range: 1900 - 1909', range: [1900, 1909] },
            { label: 'Range: 1909 - 1919', range: [1909, 1919] },
            { label: 'Range: 1920 - 1929', range: [1920, 1929] },
            { label: 'Range: 1930 - 1939', range: [1930, 1939] },
            { label: 'Range: 1940 - 1949', range: [1940, 1949] },
            { label: 'Range: 1950 - 1959', range: [1950, 1959] },
            { label: 'Range: 1960 - 1969', range: [1960, 1969] },
            { label: 'Range: 1970 - 1977', range: [1970, 1977] },
          ];
        
          const matchingYears = decadeDataArray
            .map(item => {
              // If the element is educations, use year; else, use start_year
              return element === 'educations' ? item.attributes.year : item.attributes.start_year;
            })
            .filter(year => {
              if (!year) return false; // Skip null or empty years
        
              // Check if the year falls within any of the defined ranges
              return yearRanges.some(range => 
                allValues.includes(range.label) &&
                (range.range[0] === null || year >= range.range[0]) &&
                (range.range[1] === null || year <= range.range[1])
              );
            });
        
          // Remove duplicates by converting to a Set and back to an array, then sort from lowest to highest
          const uniqueYears = [...new Set(matchingYears)].sort((a, b) => a - b);
        
          if (categories.includes(element)) {
            tableItem[formatDisplayName(element === 'political_office_helds' ? 'Years Office Held' : 'Year Graduated')] = uniqueYears.length > 0
              ? uniqueYears.join(', ')
              : 'N/A';
          }
        }
        else {
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
        if (Array.isArray(nestedValue) ) {
          nestedValuesArray = nestedValue.flatMap(item => {
            return Object.entries(item)
              .filter(([key, value]) =>   
                categories.includes(key) &&
                value != null && // Ensure value is not null or undefined
                allValues
                  .map(substring => substring.toLowerCase()) // Convert allValues to lowercase
                  .some(substring => 
                    typeof value === 'string' && 
                    value.toLowerCase().includes(substring) // Convert value to lowercase
                  )
              )
              .map(([, value]) => {
                return value;
              });
          });
        } else {
          nestedValuesArray.push(convertBooleanToString(nestedValue || 'N/A'));
        }
        const uniqueValuesArray = [...new Set(nestedValuesArray)];
        tableItem[formattedKey] = uniqueValuesArray.length > 1 
          ? uniqueValuesArray.join(', ') 
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
