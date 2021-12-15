import { reactive } from 'vue'
import { Screen } from 'quasar'
import store from 'src/store'

const state = reactive({
    sections: {
        penguin: {
            label: 'Penguin',
            icon: 'fab fa-linux'
        },
        account: {
            label: 'Account',
            icon: 'account_circle',
            fields: {
                fugetPropSubscription: {
                    type: 'field-item',
                    label: 'Fudget Pro Subscription',
                    icon: 'bookmark_added',
                    value: 'Subscribed',
                    click() {
                        console.log('restoreProsubscription log')
                    }
                },
                restoreProsubscription: {
                    type: 'field-item',
                    label: 'Restore pro subscription',
                    icon: 'restore',
                    click() {
                        console.log('restoreProsubscription log')
                    }
                },
                getFudgetDesktop: {
                    type: 'field-item',
                    label: 'Get Fudget Desktop',
                    badge: 'FREE!',
                    icon: 'branding_watermark',
                    click() {
                        console.log('getFudgetDesktop log')
                    }
                }
            }
        },
        appearance: {
            label: 'Appearance',
            icon: 'far fa-image',
            fields: {
                language: {
                    type: 'field-select',
                    label: 'Language',
                    value: {
                        label: 'English',
                        value: 'en-US'
                    },
                    options: [
                        {
                            label: 'English',
                            value: 'en-US'
                        },
                        {
                            label: 'Korean',
                            value: 'ko'
                        },
                    ],
                    change(value) {
                        console.log('change', value)
                    }
                },
                theme: {
                    type: 'field-select',
                    label: 'Theme',
                    value: {
                        label: 'Orange',
                        value: 'orange',
                        color: 'primary',
                        icon: 'las la-square'
                    },
                    options: [
                        {
                          label: 'Orange',
                          value: 'orange',
                          icon: 'crop_din',
                          color: '#FF8C00'
                        },
                        {
                          label: 'Orange-light',
                          value: 'orange-light',
                          icon: 'crop_din',
                          color: '#FF8C00'
                        },
                        {
                          label: 'Blue',
                          value: 'blue',
                          icon: 'crop_din',
                          color: '#0078B3'
                        },
                        {
                          label: 'Blue-light',
                          value: 'blue-light',
                          icon: 'crop_din',
                          color: '#0078B3'
                        },
                        {
                          label: 'High-contrast',
                          value: 'high-contrast',
                          icon: 'crop_din',
                          color: '#000'
                        }
                    ],
                    change(value) {
                        console.log('Theme change', value)
                        // document.body.setAttribute('data-theme', value.value)
                        // document.footer.setAttribute('data-theme', value.value)
                    }
                },
                text: {
                    type: 'field-select',
                    label: 'Text-Size',
                    value: { value: 'sm', label: 'Small' },
                    options: [
                        { value: 'sm', label: 'Small' },
                        { value: 'md', label: 'Medium' },
                        { value: 'lg', label: 'Large' },
                        { value: 'xl', label: 'Extra Large' }
                    ],
                    change(value) {
                        console.log('Text Size change', value)
                        // document.body.setAttribute('data-text-size', value.value)
                        // document.footer.setAttribute('data-text-size', value.value)
                        // i18n.global.local = value.value
                    }
                }
            }
        },
        dates: {
            label: 'Dates',
            icon: 'far fa-calendar-alt',
            fields: {
                dateFormat: {
                    type: 'field-select',
                    label: 'Date Format:',
                    value: {
                        label: '18 Feb 2020',
                        value: 'D MMM YYYY'
                    },
                    options: [
                        {
                            label: '18 Feb 2020',
                            value: 'D MMM YYYY'
                        },
                        {
                            label: '18 Feb 2020',
                            value: 'D MMM YYYY'
                        }
                    ],
                    change(value) {
                        console.log('Date format change to : ', value.value)
                    }  
                }              
            }
        },
        currency: {
            label: 'Currency',
            icon: 'tag',
            fields: {
                currencySymbol: {
                    type: 'field-select',
                    label: 'Currency Symbol:',
                    value: {
                        label: '$ - Dollar',
                        value: '$'
                    },
                    options: [
                        {
                            label: '$ - Dollar',
                            value: '$'
                        },
                        {
                            label: '$ - Won',
                            value: '$'
                        }
                    ],
                    change(value) {
                        console.log('Currncy change to : ', value.value)
                    }
                },                
            }
        },
        budgetOptions: {
            label: 'Budget Options',
            icon: 'calculate',
            fields: {
                addNewItemsTo: {
                    type: 'field-radio',
                    label: 'Add new items to:',
                    value: 'bottomOfList',
                    options: [
                        {
                            label: '$ - Dollar',
                            value: '$'
                        },
                        {
                            label: '$ - Won',
                            value: '$'
                        }
                    ],
                    change(value) {
                        console.log('Currncy change to : ', value.value)
                    }
                },
                
            }
        },
        security: {
            label: 'Security',
            icon: 'fas fa-lock',
            fields: {
                passcodeLock: {
                    type: 'field-checkbox',
                    label: 'Passcode lock',
                    description: "Secure Fudget with a Passcode",
                    value: false,
                    change(value) {
                        console.log('Passcode lock to : ', value.value)
                    }
                }
            }
        },
        help: {
            label: 'Help',
            icon: 'settings_input_component',
            fields: {
                tutorial: {
                    type: 'field-item',
                    label: 'Tutorial',
                    click() {
                        console.log('Tutorial log')//HTMLFormControlsCollection.log('"Tutorial" was clicked')
                    }
                },
                askAQuestion: {
                    type: 'field-item',
                    label: 'Ask a Question',
                    click() {
                        console.log('Ask a Question', store.help.state)
                        // store.help.state.showPaneAskAQuestion = true
                    }
                }
            }
        },
        social: {
            label: 'Social',
            icon: 'fas fa-user-friends',
            fields: {
                tellAFriend: {
                    type: 'field-item',
                    label: 'Tell a friend about Fuget',
                    click() {
                        console.log('Tell a friend about Fuget')
                    }
                },
                writeAReview: {
                    type: 'field-item',
                    label: 'Write a review',
                    click() {
                        console.log('"Write a review" was clicked')
                    }
                },
                twitter: {
                    type: 'field-item',
                    label: '@sampleApp',
                    iconLeft: 'fab fa-twitter',
                    iconLeftColor: 'blue',
                    click() {
                        console.log('"Twitter" was clicked')
                    }
                },
                joinNewsletter: {
                    type: 'field-component',
                    component: `Settings/joinNewsletter.vue`
                }
            }
        }
    },
    sectionActive: null
})

const actions = {
    initSettings() {
        this.resetSectionActive()
        this.handleWindowResize()
    },
    resetSectionActive() {
        if (Screen.gt.sm && !state.sectionActive) {
            state.sectionActive = Object.keys(state.sections)[0]
        }
    },
    handleWindowResize() {
        let resizeTimer
        window.onresize = () => {
            clearTimeout(resizeTimer)
            resizeTimer = setTimeout(() => {
                this.resetSectionActive()
            }, 250)

        }
    }
}

export default{
    state, actions
}