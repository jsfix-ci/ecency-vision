import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { keySvg } from "../../img/svg";
import { _t } from "../../i18n";
import { cryptoUtils, PrivateKey } from "@hiveio/dhive";
import { error } from "../feedback";
import { ActiveUser } from "../../store/active-user/types";

export interface Props {
  activeUser: ActiveUser | null;
  onKey: (key: PrivateKey) => void;
  onBack: () => void;
  signingKey: string;
  isLoading: boolean;
  setSigningKey: (key: string) => void;
}

export const SignByKey = ({
  activeUser,
  onKey,
  onBack,
  signingKey,
  setSigningKey,
  isLoading
}: Props) => {
  const [key, setKey] = useState("");

  useEffect(() => {
    if (signingKey) {
      setKey(signingKey);
    }
  }, [signingKey]);

  const generateKey = () => {
    let pKey: PrivateKey;

    if (cryptoUtils.isWif(key)) {
      // wif
      try {
        pKey = PrivateKey.fromString(key);
      } catch (e) {
        error("Invalid active private key!");
        return;
      }
    } else {
      // master key
      pKey = PrivateKey.fromLogin(activeUser!.username, key, "active");
    }
    setKey(key);
    onKey(pKey);
    setSigningKey(key);
  };

  return (
    <div className="mt-4">
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>{keySvg}</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          value={key}
          type="password"
          autoFocus={true}
          autoComplete="off"
          placeholder={_t("key-or-hot.key-placeholder")}
          disabled={isLoading}
          onChange={(e) => setKey(e.target.value)}
        />
      </InputGroup>
      <div className="d-flex">
        <Button block={true} variant="link" className="py-3 mt-4 flex-1 mr-3" onClick={onBack}>
          {_t("market.back")}
        </Button>
        <Button
          block={true}
          variant="primary"
          className="py-3 mt-4 flex-1"
          onClick={() => generateKey()}
          disabled={isLoading}
        >
          {isLoading ? _t("market.signing") : _t("market.sign")}
        </Button>
      </div>
    </div>
  );
};
