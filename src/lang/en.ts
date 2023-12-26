/* eslint-disable no-unused-vars */

import Language from '@/lang/langInterface'

/* eslint-enable no-unused-vars */

var en = <Language> {
    // Initial page
    getting_started: 'Getting Started',
    create_new: 'Create new wallet',
    create_subtext: "We'll create a new wallet for you so you can start using Bitcoin and Monero.",
    restore_existing: 'Restore existing Bitcoin and Monero wallet',
    restore_existing_monero: 'Restore existing Monero wallet',
    restore_subtext: "You already have a wallet and want to use your recovery words to restore it.",
    change_language: 'Change language',
    choose_language: 'Choose Language',

    // Create page
    seed_phrase: "Recovery Words for BTC Wallet",
    seed_phrase_monero: "Recovery Words XMR Wallet",
    wrote_it_down: 'I wrote it down',
    generate: 'Generate',
    warning: 'Warning',
    we_will_generate_bitcoin: 'We will generate for you 12 recovery words for Bitcoin wallet.',
    we_will_generate_monero: 'We will generate for you 25 recovery words for Monero wallet.',
    warning_text_1: "Write the words down in the correct order, and keep them safe, offline. If you lose these words, you won't be able to access your Bitcoin.",
    warning_text_1_monero: "Write the words down in the correct order, and keep them safe, offline. If you lose these words, you won't be able to access your Monero.",
    warning_text_2: "These recovery words will allow you to recover your wallet. Write the words down and keep them safe, offline.",
    write_it_down: 'Write it down',
    keep_it_safe: 'Keep it safe',
    do_not_lose_it: 'Don’t lose it',
    have_saved: 'I have saved my recovery words safely.',

    // Restore page
    restore_notice: 'Please enter your recovery words to restore your wallet.',
    restore_warning: 'The recovery words you have entered are invalid. Words must be spelled correctly and have no capital letters.',
    restoring: 'Restoring...',

    // Wallet home
    refresh: 'Refresh',
    overview: 'Overview',
    send: 'Send BTC',
    send_xmr: 'Send XMR',
    receive: 'Receive BTC',
    receive_xmr: 'Receive XMR',
    settings: 'Settings',
    amount_to_send: 'Amount to send',
    not_enough_balance: 'Not enough balance to send that amount',
    send_max: 'Send max',
    amount: 'Amount',
    miner_fee: 'Network fee',
    total: 'Total',
    confirmation: 'Confirmation',
    they_receive: 'They receive',
    recepient: 'Recepient',
    sending: 'Sending...',
    are_you_sure: 'Are you sure you want to send this transaction?',
    im_sure: "Yes I'm sure, send",
    seed_modal: 'Recovery Words BTC',
    seed_modal_monero: 'Recovery Words XMR',
    transaction: 'transaction',
    transactions: 'transactions',
    buy_bitcoin: 'Buy Bitcoin',
    buy_monero: 'Buy Monero',

    // Pagination
    page: 'Page', // Displayed as 'Page 1 of 1'
    of: 'of',

    // Overview
    total_balance: "Total Balance",
    no_transactions: "You have not made any transactions yet",
    what_to_do: "What would you like to do?",
    date: 'Date',
    status: 'Status',
    processing: 'Processing',
    unconfirmed: 'Unconfirmed',
    complete: 'Complete',
    incoming_monero: 'Incoming',
    outgoung_monero: 'Outgoing',

    // Send
    send_to: 'Send only to Bitcoin (BTC) addresses',
    send_to_monero: 'Send only to Monero (XMR) addresses',
    bitcoin_address: 'BTC address',
    monero_address: 'XMR address',
    address: 'Address',
    low_priority: 'Low priority',
    standard: 'Standard',
    important: 'Important',
    low_priority_desc: "You pay less in fees, but you consider this a low-priority transaction and you don't mind possibly waiting longer for confirmation.",
    standard_desc: "This will use a moderate fee, during times of high congestion this may lead to longer confirmation time, but these are rare.",
    important_desc: "Uses a premium fee to target confirmation within 30 minutes, this is a high priority transaction and you want it confirmed quickly.",
    not_enough: "You don't have enough to send that amount and also pay the network fee. Try sending your entire balance with the Send Max button instead.",
    dust_error: "The amount you are trying to send is too small for the Bitcoin network to process.",
    bitcoin_network_fee: "Bitcoin Network fee",
    monero_network_fee: "Monero Network fee",

    // Receive
    receive_only: 'Receive only Bitcoin',
    receive_only_monero: 'Receive only Monero',
    wallet_address: 'Wallet address',
    address_below: 'to the address below',

    // Settings
    show_seed: 'Recovery BTC',
    show_seed_monero: 'Recovery XMR',
    language: 'Language',
    currency: 'Currency',
    exit_wallet: 'Exit wallet',

    // Buttons
    back_button: 'Back',
    restore_button: 'Restore',
    next_button: 'Next',
    ok_button: 'OK',
    copy_button: 'Copy',
    save_button: 'Save',

    // Notification
    notification_title: 'Incoming Transaction',

    // Exit wallet
    exit_text: 'This will destroy your wallet files and all records of your transactions. The only way to restore your wallet will be through your recovery words',
    exit_are_you_sure: 'Are you sure you want to delete and exit this wallet?',
    exit_label_text: 'Yes, delete this wallet',
    exit_delete: 'Delete'
}

export default en
