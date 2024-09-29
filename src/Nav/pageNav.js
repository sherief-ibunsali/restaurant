import { Link } from "react-router-dom";

export default function PagNav() {
  return (
    <div>
      <nav>
        <button>
          <Link to="foodmenu">Go to menu</Link>
        </button>
      </nav>
    </div>
  );
}
