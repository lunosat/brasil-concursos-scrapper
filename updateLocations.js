import axios from "axios";
import fs from "fs/promises";

const locFileBuffer = await fs.readFile("src/utils/locations.json", {
  encoding: "utf-8",
});
let locFile = JSON.parse(locFileBuffer);

const update = async () => {
  try {
    const req = await axios.get(
      "http://servicodados.ibge.gov.br/api/v1/localidades/distritos"
    );

    const data = req.data;

    let finalData = [];
    data.forEach((v) => {
      let obj = {
        city: v.nome,
        state: v.municipio.microrregiao.mesorregiao.UF.nome,
        initials: v.municipio.microrregiao.mesorregiao.UF.sigla,
      };
      finalData.push(obj);
    });

    locFile["locations"] = finalData;

    await fs.writeFile("src/utils/locations.json", JSON.stringify(locFile));
    console.log("Sucess update.");
  } catch (e) {
    throw new Error("Error on get data: ", e.message);
  }
};

update()
