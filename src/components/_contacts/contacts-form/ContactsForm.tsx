import React from 'react';
import "./contacts-form.scss"
import {IFormInput} from "@/types/data";
import Form from "@/components/form/Form";

interface Props{
  title: string
  inputs: IFormInput[]
  agreement: string
}

const ContactsForm = ({title, inputs, agreement}: Props) => {
  return (
      <div className="contacts-form container">
        <h2 className="contacts-form__title">{title}</h2>

        <Form inputs={inputs} typeForm="email" agreement={agreement} />
      </div>
  );
};

export default ContactsForm;
