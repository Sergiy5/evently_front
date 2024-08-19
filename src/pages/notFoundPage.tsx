import { Link } from "react-router-dom";

const NotFoundPage:React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1>Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <Link to="/" className=" bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">Go Home...</Link>
    </div>
  );
};

export default NotFoundPage;
