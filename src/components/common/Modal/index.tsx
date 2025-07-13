import React from "react";
import $ from "./Modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Modal({
  children,
  onConfirm,
  onCancel,
}: ModalProps) {
  return (
    <div className={$.overlay}>
      <div className={$.modal}>
        <div className={$.content}>{children}</div>
        <div className={$.actions}>
          <button onClick={onCancel}>취소</button>
          <button onClick={onConfirm}>확인</button>
        </div>
      </div>
    </div>
  );
}
