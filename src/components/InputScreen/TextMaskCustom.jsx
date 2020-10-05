import React from "react";
import MaskedInput from "react-text-mask";

const mask = {
  date: [
    /[0-3]/,
    /[0-9]/,
    "/",
    /[0-1]/,
    /[0-9]/,
    "/",
    /(\d)/,
    /(\d)/,
    /(\d)/,
    /(\d)/,
    " ",
    /[0-2]/,
    /[0-9]/,
    ":",
    /[0-5]/,
    /[0-9]/,
    ":",
    /[0-5]/,
    /[0-9]/
  ], //2020-01-01 18:48:05
  hour: [
    /[0-2]/,
    /[0-9]/,
    ":",
    /[0-5]/,
    /[0-9]/,
    ":",
    /[0-5]/,
    /[0-9]/
  ], //18:48:05
  chamado: [
    /\w{3,4}/,
  ] // ((INC)|(ECS)|(RITM))((\d|_)(\d{8}|(\d{7}_\d{2})))
};

export default function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask.date}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}
export function TextMaskCustomHour(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask.hour}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}
export function TextMaskCustomCall(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask.chamado}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}