export const leftPad = function(number) {
  const pad = '00';
  return pad.substr(0, pad.length - number.length) + number;
}

export const stringToUrl = function(name) {
  let data = name.replace(/\s+/g, '-');
  data = data.toLowerCase();
  return data;
};
