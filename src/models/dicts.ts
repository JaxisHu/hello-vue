const dicts: any = {
  roles: [
    { key: "1", value: '经销商' },
    { key: "2", value: '会员' },
    { key: "3", value: '粉丝' }
  ]
};

export default {
  getDict(key: any) {
    return dicts[key];
  }
};
