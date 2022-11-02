# rr-pagination

The rr-pagination package is created to orchestrate with react router applications. In a nutshell, it adds a page parameter to the query string params. 

It is also has a basic accesibility and you can inject your language labels, text and class names to control the visuality. 

You can also inject a callback function that gets the event and page namber that has been clcicked.

It should work with SSR or CSR application. 

## Usage
 
```
#index.js

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

```
#App.js

    import '@eran-or/rr-pagination/dist/index.css'
    import Pagination from '@eran-or/rr-pagination/'

function App() {
  
  return (
    <div className="App">
      <Pagination itemsPerPage={5} totalItems={20} />
    </div>
  );
}

export default App;


```
## Options 

`?`  means optional 

| Property               | valueType | defaultValue                                                   |
| :---                   | :---      | :---                                                           |
| itemsPerPage           | number    | 5                                                              |
| totalItems             | number    | 0                                                              |
| rangeSize?             | number    | 3                                                              |
| classNames?            | string    |                                                                |
| previousText?          | string    | Previous                                                       |
| GotoPageAriaLabel?     | string    | Go to page                                                     |
| nextText?              | string    | Next                                                           |
| nextTextAriaLabel?     | string    | Go to Next page                                                |
| previousTextAriaLabel? | string    | Back to previous page                                          |
| currentPageAriaLabel?  | string    | Current Page is                                                |
| paginationAriaLabel?   | string    | Pagination                                                     |
| onClick?               | function  | (e: React.MouseEvent<HTMLElement>, pageNum: number) => void;   |