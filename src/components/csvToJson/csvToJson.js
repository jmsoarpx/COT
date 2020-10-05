const csvToJson = async (content, params, cb) => {
  let json = {};
  let arr = content.toString().replace(/\r/g, "").split("\n");

  const skipCol = params.skipCol;
  const csvLen = params.csvLen <= 0 ? arr.length - 1 : params.csvLen;
  const delimiter = params.delimiter;

  if (delimiter === ",") {
    let arrZero = arr[0];
    if (arrZero.endsWith(",,")) {
      arrZero = arrZero.replace(",,", "");
    }
    let h = arrZero
      .replace(/,(?=\")/g, "´")
      .replace(/"/g, "")
      .split("´");
    h.splice(0, skipCol);

    for (let x = 0; x < h.length; x++) {
      json[h[x]] = [];
    }

    for (let ln = 1; ln < csvLen + 1; ln++) {
      let arrLn = arr[ln];
      if (arrLn.endsWith(",,")) {
        arrLn = arrLn.replace(",,", "");
      }
      let line = arrLn
        .replace(/,(?=\")/g, "´")
        .replace(/"/g, "")
        .split("´");

      for (let x = skipCol; x < line.length; x++) {
        json[h[x - skipCol]].push(line[x]);
      }
    }
    if (cb) {
      return cb(json);
    } else return json;
  } else {
    let arrZero = arr[0];
    if (arrZero.endsWith(";;")) {
      arrZero = arrZero.replace(";;", "");
    }
    let h = arrZero.replace(/;/g, "´").replace(/"/g, "").split("´");
    h.splice(0, skipCol);

    for (let x = 0; x < h.length; x++) {
      json[h[x]] = [];
    }

    //console.log(json);
    for (let ln = 1; ln < csvLen + 1; ln++) {
      let arrLn = arr[ln];
      if (arrLn.endsWith(";;")) {
        arrLn = arrLn.replace(";;", "");
      }
      let line = arrLn.replace(/;/g, "´").replace(/"/g, "").split("´");
      //console.log(line.length);
      for (let x = skipCol; x < line.length; x++) {
        //console.log(line);
        //console.log(x);
        try {
          json[h[x - skipCol]].push(line[x]);
        } catch (err) {
          console.log("Erro do arquivo, na linha:" + (ln + 1));
          throw err;
        }
      }
    }
    if (cb) {
      return cb(json);
    } else return json;
  }
};

export default csvToJson;
