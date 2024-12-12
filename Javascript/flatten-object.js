const obj = {
  user: {
    name: "John Doe",
    address: {
      street: "123 Main St",
      city: "Somewhere",
      country: {
        name: "CountryX",
        code: "CX",
      },
    },
    preferences: {
      theme: "dark",
      notifications: {
        email: true,
        sms: false,
      },
    },
  },
  order: {
    id: 12345,
    items: [
      { id: 1, name: "Item 1", quantity: 2 },
      { id: 2, name: "Item 2", quantity: 1 },
    ],
  },
};

const flattenObj = (ob) => {
  let result = {};

  // loop through the object "ob"
  for (const i in ob) {
    // We check the type of the i using
    // typeof() function and recursively
    // call the function again
    if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
      const temp = flattenObj(ob[i]);
      for (const j in temp) {
        // Store temp in result
        result[i + "." + j] = temp[j];
      }
    }

    // Else store ob[i] in result directly
    else {
      result[i] = ob[i];
    }
  }
  return result;
};

function flattenObject1(obj, prefix = "") {
  let result = {};

  for (let key in obj) {
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      Object.assign(result, flattenObject1(obj[key], prefix + key + "."));
    } else if (Array.isArray(obj[key])) {
      obj[key].forEach((item, index) => {
        Object.assign(
          result,
          flattenObject1(item, `${prefix}${key}[${index}].`)
        );
      });
    } else {
      result[prefix + key] = obj[key];
    }
  }

  return result;
}

console.log(flattenObject1(obj));
