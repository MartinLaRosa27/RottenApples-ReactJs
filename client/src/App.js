import { ReviewsProvider } from "./context/ReviewsProvider";
import { UserProvider } from "./context/UserProvider";
import { Router } from "./Router";

function App() {
  return (
    <>
      <UserProvider>
        <ReviewsProvider>
          <Router />
        </ReviewsProvider>
      </UserProvider>
    </>
  );
}

export default App;
