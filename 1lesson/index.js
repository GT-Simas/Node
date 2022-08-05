const casual = require("casual");

console.log("Simas Proo");

const randomPersonName = () =>  {
    return`${casual.name_prefix} ${casual.first_name} ${casual.last_name}`
};

const sex = ['male', 'female', 'other'];
const randomSex = sex[casual.integer((from = 0),(to = 2))];

casual.define('user', () => ({
    firstName: casual.first_name,
    lastName: casual.last_name,
    sex: randomSex,
   adress: {
    country: casual.country,
    city: casual.city,
    street: casual.street,
   },
   email: casual.email,
   password: casual.password,
   age: casual.integer((from = 0), (to = 99)),
   month: casual.month_name,
   color: casual.color_name,
}));

console.log(casual.user);











console.log(casual.email + casual.password + casual.year + casual.month_number + casual.color_name);