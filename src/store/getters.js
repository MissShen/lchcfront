const getters = {
  token: state => state.user.token,
  loginCode: state => state.user.loginCode,
  loginId: state => state.user.loginId,
  orgId: state => state.user.orgId,
  roleIds: state => state.user.roleIds,
  roleNames: state => state.user.roleNames,
  userImage: state => state.user.userImage,
  accountType: state => state.user.accountType,
  perms: state => state.user.perms,
  perm_routers: state => state.permResource.routers,
  addRouters: state => state.permResource.addRouters,
  printData: state => state.user.printData
};
export default getters
