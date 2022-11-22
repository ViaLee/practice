export const register = () => {
  const isHttps = document.location.protocol === 'https:';
  const serviceWorker = navigator.serviceWorker;

  if (!isHttps) {
      //  非https 不生效
      // return;
  }

  if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
          serviceWorker
              .register('/sw.js') //这块注意不要改动
              .then((reg) => {
                  if (reg.installing) {
                      console.log('Service worker installing');
                  } else if (reg.waiting) {
                      console.log('Service worker installed');
                  } else if (reg.active) {
                      console.log('Service worker active');
                  }
                  console.log('ServiceWorker register success', reg);
              })
              .catch((registrationError) => {
                  console.log('ServiceWorker register failed: ', registrationError);
              });
      });
  }
};

export const cleanCache = (opt: { all?: boolean }) => {
  const { all = true } = opt;
  if (all) {
      // remove all caches
      if (window.caches) {
          caches.keys().then((keys) => {
              keys.forEach((key) => {
                  caches.delete(key).then(() => {
                      console.log('all caches cleaned');
                  });
              });
          });
      }
  } else {
      // remove key caches
  }
};

export const unRegister = () => {
  // TODO: 注销对应的sw
  const serviceWorker = navigator.serviceWorker;
  if (serviceWorker.getRegistrations) {
      console.log('清除多个');
      serviceWorker.getRegistrations().then(function (sws) {
          console.log(sws, 'swsswssws');
          sws.forEach(function (sw) {
              sw.unregister();
              console.log('sw unregister 1');
          });
      });
  } else if (serviceWorker.getRegistration) {
      console.log('清除');
      serviceWorker.getRegistration().then(function (sw) {
          sw?.unregister();
          console.log('sw unregister 2');
      });
  } else {
      console.log('无');
  }
};

