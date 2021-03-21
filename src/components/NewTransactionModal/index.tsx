import Modal from "react-modal";
import { Container, SelectedTypeButton, TransactionTypeButton } from "./styles";
import closeIMG from "../../assets/close.svg";
import incomeIMG from "../../assets/income.svg";
import outcomeIMG from "../../assets/outcome.svg";
import { FormEvent, useContext, useState } from "react";

import { TransactionsContext } from "../../TransactionsContext";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useContext(TransactionsContext);

  const [type, setType] = useState("deposit");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await createTransaction({ title, type, amount, category })

    setAmount(0);
    setCategory("");
    setTitle("");
    setType("deposit");

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeIMG} alt="close" />
      </button>
      <Container onSubmit={handleSubmit}>
        <h2>Cadastrar transação</h2>
        <input
          placeholder="Título"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(event) => {
            setAmount(Number(event.target.value));
          }}
        />

        <TransactionTypeButton>
          <SelectedTypeButton
            type="button"
            onClick={() => {
              setType("deposit");
            }}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeIMG} alt="Entrada" />
            <span>Entrada</span>
          </SelectedTypeButton>

          <SelectedTypeButton
            type="button"
            onClick={() => {
              setType("withdraw");
            }}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeIMG} alt="Saida" />
            <span>Saida</span>
          </SelectedTypeButton>
        </TransactionTypeButton>

        <input
          placeholder="Categoria"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
