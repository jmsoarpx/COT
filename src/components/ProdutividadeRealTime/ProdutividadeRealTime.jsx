import React, { useState, useEffect } from "react";
import moment from "moment";

export default function ProdutividadeRealTime(props) {
  // const [quantidadeChamados, setQuantidadeChamados] = useState(53);
  // const [tempoCallBack, setTempoCallBack] = useState("05:30:00");
  const quantidadeChamados = props.quantidadeChamados;
  const tempoCallBack = props.tempoCallBack;

  const [esperado, setEsperado] = useState(0);
  const [produtividadeHora, setProdutividadeHora] = useState(12);

  useEffect(() => {
    setEsperado(
      (moment(tempoCallBack, "HH:mm:ss").hours() +
        moment(tempoCallBack, "HH:mm:ss").minutes() / 60) *
        produtividadeHora
    );
  }, [quantidadeChamados, tempoCallBack]);

  return (
    <>
      {quantidadeChamados > esperado ? (
        <div className="alert alert-success" role="alert">
          <span className="font-weight-bold">Acima da Meta!</span> Em{" "}
          {tempoCallBack} de CallBack foi tratado {quantidadeChamados} chamados.
          A produtividade esperada é de {esperado} chamados.
        </div>
      ) : (
        <div className="alert alert-danger" role="alert">
          <span className="font-weight-bold">Abaixo da Meta!</span> Em{" "}
          {tempoCallBack} de CallBack foi tratado {quantidadeChamados} chamados.
          A produtividade esperada é de {esperado} chamados.
        </div>
      )}
    </>
  );
}

export function produtividadeEsperada(callBack, produtividadeHora) {
  return (
    (moment(callBack, "HH:mm:ss").hours() +
      moment(callBack, "HH:mm:ss").minutes() / 60) *
    produtividadeHora
  );
}
