import $ from "./appbar.module.scss";
import ArrowLeft from "@/assets/svg/ArrowLeft.svg";
import classNames from "classnames";

interface AppBarProps {
  leftRole?: "back";
  onClickLeftButton?: () => void;
  className?: string;
}

export default function AppBar({
  leftRole,
  onClickLeftButton,
  className,
}: AppBarProps) {
  return (
    <div className={classNames($.layout, className)}>
      {leftRole === "back" && (
        <img src={ArrowLeft} onClick={onClickLeftButton} />
      )}
    </div>
  );
}
