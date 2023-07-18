```ts
import { useState, useEffect } from "react";

export interface pageDatatype {
  total?: number;
  totalPage?: number;
  currentPage: number;
  pageSize: number;
}

const usePage = (queryClick) => {
  const [queryData, setQueryData] = useState({});
  const [pageData, setPageData] = useState<pageDatatype>({
    //分页数据
    currentPage: 1,
    pageSize: 10,
    total: 0,
  });
  const [tableList, setTableList] = useState([]); //table数据
  const [router, setRouter] = useState([]);

  useEffect(() => {
    let routerData = sessionStorage.getItem("breadcrumbList")
      ? JSON.parse(sessionStorage.getItem("breadcrumbList") || "")
      : []; // 获取存放在会话储存中的路径地址
    setRouter(routerData);
  }, []);

  const pageChange = (currentPage: number, pageSize: number) => {
    let pageData = {
      currentPage,
      pageSize,
    };
    queryClick(queryData, pageData);
  };
  return {
    router,
    pageChange,
    queryData,
    setQueryData,
    pageData,
    setTableList,
    tableList,
    setPageData,
  };
};

export default usePage;
```
