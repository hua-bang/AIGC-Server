import classnames from "classnames";
interface ContentProps {
  className?: string;
}

const Content: React.FC<ContentProps> = ({
  className
}) => {

  return (
    <div className={classnames(className)}>
      Content
    </div>
  );
}

export default Content;