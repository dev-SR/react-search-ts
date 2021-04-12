let array = ['abc', 'abcc', 'abccckd', 'hghf', 'efs'];

let r = array.filter((n) => n.includes('a'));
console.log(r);
var regex = new RegExp(''); //?: Match expression but do not capture it.
console.log(regex);

const filtered = array.filter((e) => e.match(regex));
console.log(filtered);
