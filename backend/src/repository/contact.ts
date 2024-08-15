import { IContact, IContactCreate } from "../interfaces/contact";
import { readFileSync } from "fs";
import fs from "fs/promises";
import { v4 as uuidv4, v4 } from "uuid";

class ContactRepository {
  private contacts: IContact[] = [];

  constructor() {
    this.loadFromFile();
  }

  private async loadFromFile() {
    try {
      const data = readFileSync("./localdb.json");
      this.contacts = JSON.parse(data.toString());
    } catch (error) {
      fs.writeFile("./localdb.json", "");
    }
  }

  private saveToFile() {
    return fs.writeFile("./localdb.json", JSON.stringify(this.contacts));
  }

  create(contact: IContactCreate): Promise<IContact> {
    return new Promise((resolve, reject) => {
      const newContact: IContact = {
        ...contact,
        id: v4(),
      };

      this.contacts.push(newContact);
      this.saveToFile()
        .then(() => resolve(newContact))
        .catch((err) => reject(err));
    });
  }

  getAll(): Promise<IContact[]> {
    return new Promise((resolve, reject) => {
      resolve(this.contacts);
    });
  }

  findByPhone(phone: string): Promise<IContact | undefined> {
    return new Promise((resolve, reject) => {
      const foundContact = this.contacts.find(
        (contact) => contact.phone === phone
      );
      this.saveToFile();
      resolve(foundContact);
    });
  }

  findByLastName(lastName: string): Promise<IContact[]> {
    return new Promise((resolve, reject) => {
      const matchingContacts = this.contacts.filter((contact) =>
        contact.lastName.toUpperCase().includes(lastName.toUpperCase())
      );
      this.saveToFile();
      resolve(matchingContacts);
    });
  }

  findById(id: string): Promise<IContact | undefined> {
    return new Promise((resolve, reject) => {
      const foundContact = this.contacts.find((contact) => contact.id === id);
      this.saveToFile();
      resolve(foundContact);
    });
  }

  findIndexById(id: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const foundIndex = this.contacts.findIndex((contact) => contact.id == id);

      resolve(foundIndex);
    });
  }

  deleteContactByIndex(foundIndex: number) {
    return new Promise(async (resolve, reject) => {
      this.contacts.splice(foundIndex, 1);

      this.saveToFile()
        .then(() => resolve(undefined))
        .catch((err) => reject(err));
    });
  }

  updateContactByIndex(foundIndex: number, contact: IContactCreate) {
    return new Promise(async (resolve, reject) => {
      const updatedContact = {
        ...this.contacts[foundIndex],
        ...contact,
      };

      this.contacts.splice(foundIndex, 1, updatedContact);

      this.saveToFile()
        .then(() => resolve(updatedContact))
        .catch((err) => reject(err));
    });
  }
}

export const contactRepository = new ContactRepository();
