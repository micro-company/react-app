export default function getForm(currentTab) {
  switch (currentTab) {
    case 'recovery':
      return [
        {
          name: 'email',
          label: 'Email',
          type: 'TextField',
        },
      ]
    case 'recoveryPassword':
      return [
        {
          name: 'password',
          label: 'Password',
          type: 'TextField',
        },
        {
          name: 'retryPassword',
          label: 'Retry password',
          type: 'TextField',
        },
      ]
    case 'signOn':
      return [
        {
          name: 'email',
          label: 'Email',
          type: 'TextField',
        },
        {
          name: 'password',
          label: 'Password',
          type: 'TextField',
        },
        {
          name: 'retryPassword',
          label: 'Retry password',
          type: 'TextField',
        },
        {
          name: 'language',
          label: 'Language',
          type: 'Select',
          option: [
            {
              value: 'ru_RU',
              label: 'Russia',
            },
            {
              value: 'en_GB',
              label: 'English',
            },
          ],
        },
      ]
    case 'logIn':
    default:
      return [
        {
          name: 'email',
          label: 'Email',
          type: 'TextField',
        },
        {
          name: 'password',
          label: 'Password',
          type: 'TextField',
          typeInput: 'password',
        },
        {
          name: 'language',
          label: 'Language',
          type: 'Select',
          option: [
            {
              value: 'ru_RU',
              label: 'Russia',
            },
            {
              value: 'en_GB',
              label: 'English',
            },
          ],
        },
      ]
  }
}
