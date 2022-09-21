import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import useCategories from "../../hooks/useCategories";
import useSmallHeight from "../../hooks/useSmallHeight";

import MuiDatePicker from "../DatePicker";
import {
  ChangeTransaction,
  ContentInner,
  FieldInpout,
  Nav,
  Notes,
  OverlayWrapper,
  Row,
  SubmitBtn,
} from "./Popup.style";
import { EXPENSES, INCOME } from "../../constants/transactionTypes";
import useTransaction from "../../hooks/useTransaction";
import {
  addTransaction,
  changeCurrentTransactionType,
  updateTransaction,
} from "../../contexts/GlobalActions";
import Category from "../../components/Category";
import useBoolean from "../../hooks/useBoolean";

const Popup = ({ actions, selectedTrans }) => {
  const keyboardDidShow = useSmallHeight();
  const { value: noteFocus, setTrue, setFalse } = useBoolean(false);
  const [trans, setTrans] = useState(() => {
    const today = new Date();
    return {
      amount: "",
      timestamp: today.getTime(),
      category: "",
      note: "",
      id: uuidv4(),
      date: "",
    };
  });
  const [state, dispatch] = useTransaction();
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const categories = useCategories();

  useEffect(() => {
    if (selectedTrans) {
      setTrans(selectedTrans);
      const cat = categories.find((item) => item.id === selectedTrans.category);
      dispatch(changeCurrentTransactionType(cat.type));
    }
  }, []);

  const autoSize = (e) => {
    let value = 1;
    if (e.key === "Backspace") value = -1;
    e.target.style.width = e.target.value.length + value + "ch";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrans({
      ...trans,
      [name]: value,
    });
  };

  const handleDateTimeChange = (value) => {
    setTrans({
      ...trans,
      timestamp: value,
    });
  };

  const handleSelectCategory = (categoryId) => {
    setTrans({
      ...trans,
      category: categoryId,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validate(trans));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      const data = {
        ...trans,
        date: moment(trans.timestamp).format("DD-MM-YYYY"),
      };
      const hasID = state.transactions.some((item) => item.id === trans.id);
      if (hasID) {
        dispatch(updateTransaction(data));
      } else {
        dispatch(addTransaction(data));
      }
      actions.handleShowPopup();
    }
  }, [error]);

  const validate = (values) => {
    const errors = {};
    if (!values.amount) errors.amount = "Amount is required";
    if (Number(values.amount) === 0)
      errors.amount = "Amount have to more than 0";
    if (!values.category) errors.category = "Category is required";
    return errors;
  };

  const handleChangeTransaction = () => {
    const transType =
      state.currentTransactionType === EXPENSES ? INCOME : EXPENSES;
    dispatch(changeCurrentTransactionType(transType));
  };

  const overlay = {
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
    },
    hidden: {
      opacity: 0,
      transition: { duration: 0.8, ease: [0.36, 0.66, 0.04, 1] },
    },
  };

  return (
    <OverlayWrapper
      initial="hidden"
      variants={overlay}
      animate="visible"
      exit="hidden"
    >
      <Row
        initial={{ y: "100%" }}
        animate={{
          y: 0,
          transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
        }}
        exit={{
          y: "100%",
          transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
        }}
      >
        <Nav>
          <div className="nav-inner">
            <button
              className="cancle"
              onClick={() => actions.handleShowPopup(null)}
            >
              Cancel
            </button>
            <motion.span
              className="current-transaction"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              key={state.currentTransactionType}
            >
              {state.currentTransactionType}
            </motion.span>
          </div>
        </Nav>
        <ContentInner width={trans.amount.length}>
          <form onSubmit={handleSubmit}>
            <div className="transaction-input">
              <div className="input">
                <span className="currency">$</span>
                <input
                  type="number"
                  placeholder="0"
                  onKeyDown={autoSize}
                  value={trans.amount}
                  onChange={handleInputChange}
                  step={0.01}
                  name="amount"
                  min={0}
                />
              </div>
              <ChangeTransaction actions={{ handleChangeTransaction }} />
            </div>
            <AnimatePresence>
              {error.amount && (
                <motion.p
                  className="error-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                >
                  {error.amount}
                </motion.p>
              )}
            </AnimatePresence>
            <FieldInpout>
              <MuiDatePicker
                selectedDate={trans.timestamp}
                actions={{ handleDateTimeChange }}
              />
            </FieldInpout>
            <Category
              actions={{ handleSelectCategory }}
              selectedCat={trans.category}
            />
            {error.category && (
              <p className="error-message">{error.category}</p>
            )}
            <Notes keyboardDidShow={keyboardDidShow} focus={noteFocus}>
              <textarea
                className="notes"
                placeholder="Note..."
                rows="1"
                onChange={handleInputChange}
                name="note"
                defaultValue={trans.note}
                onFocus={setTrue}
                onBlur={setFalse}
              ></textarea>
            </Notes>
            <SubmitBtn>
              <button type="submit" className="submit">
                Save
              </button>
            </SubmitBtn>
          </form>
        </ContentInner>
      </Row>
    </OverlayWrapper>
  );
};

export default Popup;
