import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import styles from "./DropDownButton.module.scss";

export interface Option<T extends string> {
  value: T;
  label: string;
}

interface DropDownButtonProps<T extends string> {
  options: readonly Option<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "small" | "medium";
  className?: string;
}

function DropDownButton<T extends string>({
  options,
  value,
  onChange,
  size = "medium",
  className = "",
}: DropDownButtonProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });

  const currentOption =
    options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width, 
      });
    }
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={`${styles.selectWrapper} ${styles[size]} ${className}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.selectedContent}>{currentOption.label}</span>
        <MdKeyboardArrowDown
          className={styles.icon}
          size={18}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </button>

      {isOpen &&
        createPortal(
          <ul
            ref={dropdownRef}
            className={styles.optionsList}
            style={{
              position: "fixed",
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${position.width}px`,
              zIndex: 99999,
            }}
          >
            {options.map((option) => (
              <li
                key={option.value}
                className={`${styles.optionItem} ${
                  option.value === value ? styles.selected : ""
                }`}
                onClick={() => {
                  onChange(option.value as T);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>,
          document.body
        )}
    </>
  );
}

export default DropDownButton;
