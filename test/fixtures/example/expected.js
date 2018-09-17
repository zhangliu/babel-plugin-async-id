let __CTRIP_ASYNC_ID__
const test = () => {
    const __CTRIP_ASYNC_ID__ = test.__CTRIP_ASYNC_ID__;
    return function test1{
      return () => {
        return __CTRIP_ASYNC_ID__;
      };
    };
  };
  console.log.__CTRIP_ASYNC_ID__ = __CTRIP_ASYNC_ID__ ? __CTRIP_ASYNC_ID__ : `${Date.now()}$${Math.random()}`
  test.__CTRIP_ASYNC_ID__ = __CTRIP_ASYNC_ID__ ? __CTRIP_ASYNC_ID__ : `${Date.now()}$${Math.random()}`
  console.log(test()()());