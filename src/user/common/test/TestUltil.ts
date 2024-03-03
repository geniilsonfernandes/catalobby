export class TestUltil {
  static giveMeAUser() {
    return {
      id: '1',
      name: 'name',
      email: 'email@email.com',
      password: 'password',
    };
  }

  static giveStoredUser() {
    return {
      id: '1',
      name: 'name',
      email: 'email@email.com',
      password: '$2b$08$Fp.EZVqyVDMiTJuN78.SQuav69jhqFkjxgHGuf0f5vwxgxawOZele',
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
  static giveMeUsers(count = 1) {
    const users = [];
    for (let i = 0; i < count; i++) {
      users.push(this.giveMeAUser());
    }
    return users;
  }

  static giveMeAStore() {
    return {
      id: '1234',
      admin_id: '1',
      store_name: 'mock store',
    };
  }
}
