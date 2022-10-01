import styled from "styled-components";
import { motion } from "framer-motion";
import { RiExchangeLine } from "react-icons/ri";
export const OverlayWrapper = styled(motion.div)`
  width: 100%;
  height: 100vh;
  background-color: #868996;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  z-index: 2;
`;

export const Row = styled(motion.div)`
  padding: 3rem 2rem;
  height: 98%;
  width: 98%;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  margin-top: auto;
`;

export const Nav = styled.div`
  font-size: 1.5rem;
  height: 3.5rem;
  width: 100%;
  background-color: #fff;
  .nav-inner {
    position: relative;
    height: inherit;
    background-color: inherit;
  }
  .current-transaction {
    font-weight: 800;
    text-transform: capitalize;
    width: 100%;
    position: absolute;
    text-align: center;
    left: 0;
    z-index: 1;
  }
  .cancle {
    border: none;
    outline: none;
    text-align: left;
    background: #fff;
    cursor: pointer;
    position: absolute;
    left: 0;
    z-index: 2;
  }
`;

export const ContentInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  form {
    margin: 0 auto;
    width: 98%;
    height: 90%;
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 0 2rem;
    background-color: #fff;
  }
  .error-message {
    color: red;
    font-size: 1.2rem;
    text-align: center;
    :first-letter {
      text-transform: capitalize;
    }
  }
  .transaction-input {
    position: rlative;
    .input {
      display: flex;
      align-itrems: center;
      justify-content: center;
      font-size: 2.5em;
      margin-left: auto;
      background-color: #fff;
    }
    input {
      outline: none;
      border: none;
      width: ${(props) => props.width + "ch"};
      min-width: 1ch;
      display: block;
      font-size: 2em;
      text-align: center;
      padding: 0;
      margin: 0;
      -webkit-appearance: none;
      -moz-appearance: textfield;
    }
    .currency {
      color: var(--gray);
      align-self: flex-start;
    }
  }
`;

export const ChangeTransaction = ({ actions }) => {
  return (
    <motion.span
      style={{
        marginLeft: "auto",
        color: "var(--gray)",
        cursor: "pointer",
        transiton: "all 1s ease-in-out",
        transform: "rotate(90deg)",
        position: "absolute",
        top: 0,
        right: 0,
      }}
      whileHover={{ scale: 1.5, rotate: 90 }}
      whileTap={{ scale: 1.5, rotate: 90 }}
      onClick={actions.handleChangeTransaction}
    >
      <RiExchangeLine style={{ fontSize: "3rem" }} />
    </motion.span>
  );
};

export const FieldInpout = styled.div`
  text-align: center;
  padding: 1rem 0;
  .datepicker {
    margin: 0 auto;
    width: 100%;
    & input {
      text-align: center;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }
`;

export const Notes = styled.div`
  background-color: #fff;
  .notes {
    font-size: 1.5rem;
    font-weight: 300;
    padding: 1rem;
    width: 100%;
    resize: none;
    border: none;
    border-bottom: 1px solid var(--gray);
    outline: none;
    font-family: inherit;
    background-color: #fff;
  }

  ${({ keyboardDidShow, focus }) =>
    keyboardDidShow &&
    focus &&
    `
    width: calc(100% - 4rem);
    position: fixed;
    bottom: 0;
    left: 2rem;
    padding-bottom: 6rem;
    .notes {
    border: 1px solid var(--gray);
    border-radius: 0.9rrem;
  }
  `}
`;

export const SubmitBtn = styled.div`
  padding: 1rem 0;
  .submit {
    font-size: 2rem;
    background-color: var(--green);
    padding: 0.8rem;
    width: 100%;
    border-radius: 1.125rem;
    outline: none;
    border: none;
    cursor: pointer;
    color: #fff;
  }
`;
