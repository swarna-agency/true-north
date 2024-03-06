import { Form } from "@remix-run/react";
import { Dispatch, SetStateAction } from "react";

type OpeningProps = {
  enterSite: Dispatch<SetStateAction<boolean>>;
};

export const Opening = ({ enterSite }: OpeningProps) => {
  return (
    <div className="opening">
      <h1 className="titleName">Peter Garrett.</h1>
      <div className="imgContainer">
        <Form method="post">
          <button
            className="albumButton"
            onClick={() => {
              enterSite(true);
            }}
          >
            <img src="/images/cd-cover.png" alt="The True North album cover" />
          </button>
        </Form>
      </div>
    </div>
  );
};
