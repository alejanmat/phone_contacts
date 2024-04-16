import Contact from "./contact.model";
const {
  synchronizeCreate,
  synchronizeUpdate,
  synchronizeDelete,
  searchItem,
} = require("./services/elastic.service");
import type { Request, Response, NextFunction } from "express";

/**
 * This function read all contact from db
 * @param {Request} the http request
 * @returns {Response} - All contacts saved on DB
 * */
const readMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ message: "Ok", contacts });
  } catch (error) {
    next(error);
  }
};

/**
 * This function read a specified contact by id
 * @param {Request} the http request with a specified contact id
 * @returns {Response} - The specified contact
 * */
const readOne = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById({ _id: id });
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

/**
 * This function create a new contact and add a new item to the elastic search index
 * @param {Request} the http request with contact info
 * @returns {Response} - The new contact
 * */
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contact = req.body;
    console.log("contact", req.body);
    const newContact = new Contact({
      ...contact,
    });
    let result = await newContact.save();

    if (result._id) {
      const id = result._id.toString();
      const { firstName, lastName, phone, address, description } = result;
      await synchronizeCreate({
        index: "contacts",
        type: "contactType",
        id: id,
        body: {
          firstName,
          lastName,
          phone,
          address,
          description,
        },
      });
      res.status(200).json({ message: "Ok", newContact });
    } else {
      res.status(500).json({ message: "User not created" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
/**
 * This function  update the item to the elastic search index and save new info to DB
 * @param {Request} the http request with contact info
 * @returns {Response} - The updated contact
 * */
const update = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await Contact.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (result) {
      const { firstName, lastName, phone, address, description } = result;
      await synchronizeUpdate({
        index: "contacts",
        id: result._id.toString(),
        body: {
          doc: {
            firstName,
            lastName,
            phone,
            address,
            description,
          },
        },
      });
      res.status(200).send({ message: "Contact updated." });
    } else {
      res.status(500).json({ message: "Contact not created" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * This function deletes the concats from db and elastic search index
 * @param {Request} the http request with contact info
 * @returns
 * */
const remove = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await Contact.findByIdAndDelete({ _id: id });
    if (result) {
      synchronizeDelete({
        index: "contacts",
        id,
      });
      res.status(200).send({ message: "Contact deleted" });
    } else {
      res.status(404).send({ message: "Cannot delete contact" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * This function search a contact in the elastich search index
 * @param {Request} the http request with contact info
 * @returns {Response} - The new contact
 * */
const search = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = req.query;
    const result = await searchItem(query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// deleteIndex();

export { readMany, readOne, create, update, remove, search };
