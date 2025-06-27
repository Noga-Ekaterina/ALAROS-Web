import React from 'react';
import "./contacts-form.scss"
import {IFormInput} from "@/types/data";
import Form from "@/components/form/Form";

interface Props{
  title: string
  inputs: IFormInput[]
}

const ContactsForm = ({title, inputs}: Props) => {
  return (
      <div className="contacts-form container">
        <h2 className="contacts-form__title">{title}</h2>

        <Form inputs={inputs} typeForm="email"/>
      </div>
  );
};

export default ContactsForm;
