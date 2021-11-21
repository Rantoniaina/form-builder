interface CardProps {
  content: any;
}

const Card = ({ content }: CardProps) => (
  <div class="bg-indigo-50 shadow-2xl rounded p-4">{content}</div>
);

export default Card;
