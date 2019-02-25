import http from 'src/axios/http'

/**
 * 查询地市列表
 * @returns {*}
 */
export function queryRegion(parentId) {
  return http({
    url: '/auditchanges/region/query',
    method: 'get',
    params: { parentId: parentId ? parentId : null }
  });
}

/**
 * 初始化省份
 * @param region
 */
export async function initRegion(region) {
  let res = await queryRegion();
  res.data.forEach(x => {
    if(x.NAME_CHN == '中国') {
      region.splice(0, 0, {
        label: x.NAME_CHN,
        value: x.ID,
        children: [],
      })
    } else {
      region.push({
        label: x.NAME_CHN,
        value: x.ID,
        children: undefined,
      });
    }
  });
}

/**
 * 级联查询省市区
 * @param region
 * @param val
 */
export async function cascRegion(region, val) {
  function find(data, id) {
    for(var i = 0; i < data.length; i++) {
      if(data[i].value == id) {
        return data[i];
      }
    }
  }

  if(val.length == 1) {
    // 选择国家
    let id = val[0];
    let dat = find(region, id);
    if(!dat.children || dat.children.length > 0) {
      return;
    }
    let res = await queryRegion(id)
    if(res.data.length == 0) {
      delete dat.children;
      return;
    }
    res.data.forEach(data => {
      let children = [];
      ['香港', '澳门', '台湾'].forEach(x => children = data.NAME_CHN.indexOf(x) != -1 ? undefined : children);
      dat.children.push({
        label: data.NAME_CHN,
        value: data.ID,
        children: children,
      });
    });
  } else if (val.length == 2) {
    // 选择省份
    let countryId = val[0];
    let provinceId = val[1];
    let country = find(region, countryId);
    let province = find(country.children, provinceId);
    if(!province.children || province.children.length > 0) {
      return;
    }
    let res = await queryRegion(provinceId)
    if(res.data.length == 0) {
      delete province.children;
      return;
    }
    res.data.forEach(data => {
      province.children.push({
        label: data.NAME_CHN,
        value: data.ID,
        children: [],
      });
    });
  }else if (val.length == 3) {
    // 选择城市
    let countryId = val[0];
    let provinceId = val[1];
    let cityId = val[2];
    let country = find(region, countryId);
    let province = find(country.children, provinceId);
    let city = find(province.children, cityId);
    if(!city.children || city.children.length > 0) {
      return;
    }
    let res = await queryRegion(cityId)
    if(res.data.length == 0) {
      delete city.children;
      return;
    }
    res.data.forEach(data => {
      city.children.push({
        label: data.NAME_CHN,
        value: data.ID,
      });
    });
  }
}

export function findRegion(ids) {
  for(let i = ids.length; i > 0; i--) {
    if(!ids[i - 1]){
      ids.splice(i - 1, 1);
    }
  }
  ids = JSON.stringify(ids);
  return http({
    url: "/auditchanges/region/find",
    method: "get",
    params: { ids }
  });
}
