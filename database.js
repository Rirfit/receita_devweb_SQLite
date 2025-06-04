import * as SQLite from 'expo-sqlite';

console.log('SQLite:', SQLite); // Veja no console o que aparece

const db = SQLite.openDatabase('receitas.db');
console.log('Database opened:', db); // Verifica se o banco foi aberto corretamente

export const initDb = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS receitas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        ingredientes TEXT NOT NULL,
        modoPreparo TEXT NOT NULL
      );`
    );
  });
};

export const addReceita = (titulo, ingredientes, modoPreparo, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO receitas (titulo, ingredientes, modoPreparo) VALUES (?, ?, ?);`,
      [titulo, ingredientes, modoPreparo],
      (_, result) => callback(true),
      (_, error) => { console.log(error); callback(false); return true; }
    );
  });
};

export const getReceitas = callback => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM receitas;`,
      [],
      (_, { rows }) => callback(rows._array),
      (_, error) => { console.log(error); return true; }
    );
  });
};

export const updateReceita = (id, titulo, ingredientes, modoPreparo, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE receitas SET titulo = ?, ingredientes = ?, modoPreparo = ? WHERE id = ?;`,
      [titulo, ingredientes, modoPreparo, id],
      (_, result) => callback(true),
      (_, error) => { console.log(error); callback(false); return true; }
    );
  });
};

export const deleteReceita = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM receitas WHERE id = ?;`,
      [id],
      (_, result) => callback(true),
      (_, error) => { console.log(error); callback(false); return true; }
    );
  });
};

export const searchReceitas = (query, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM receitas WHERE titulo LIKE ?;`,
      [`%${query}%`],
      (_, { rows }) => callback(rows._array),
      (_, error) => { console.log(error); return true; }
    );
  });
};
