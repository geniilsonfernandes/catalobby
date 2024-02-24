export class TestUltil {
  static giveMeAUser() {
    return {
      id: '1',
      name: 'name',
      email: 'email@email.com',
      password: 'password',
    };
  }
  static giveMeUsers(count = 1) {
    const users = [];
    for (let i = 0; i < count; i++) {
      users.push(this.giveMeAUser());
    }
    return users;
  }
}
