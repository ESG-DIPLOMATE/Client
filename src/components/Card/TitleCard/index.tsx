import $ from "./TitleCard.module.scss";

interface TitleCardProps {
  title: string;
}

export default function TitleCard({ title }: TitleCardProps) {
  return (
    <div className={$.card}>
      <span className={$.title}>{title}</span>
    </div>
  );
}
