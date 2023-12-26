export default interface Language {
    getting_started: string
    create_new: string
    create_subtext: string
    restore_existing: string
    restore_existing_monero: string
    restore_subtext: string
    change_language: string
    choose_language: string

    // Create page
    seed_phrase: string
    seed_phrase_monero: string
    wrote_it_down: string
    generate: string
    warning: string
    we_will_generate_bitcoin: string
    we_will_generate_monero: string
    warning_text_1: string
    warning_text_1_monero: string
    warning_text_2: string
    write_it_down: string
    keep_it_safe: string
    do_not_lose_it: string
    have_saved: string

    // Restore page
    restore_notice: string
    restore_warning: string
    restoring: string

    // Wallet home
    refresh: string
    overview: string
    send: string
    send_xmr: string
    receive: string
    receive_xmr: string
    settings: string
    amount_to_send: string
    not_enough_balance: string
    send_max: string
    amount: string
    miner_fee: string
    total: string
    confirmation: string
    they_receive: string
    recepient: string
    sending: string
    are_you_sure: string
    im_sure: string
    seed_modal: string
    seed_modal_monero: string
    transaction: string
    transactions: string
    buy_bitcoin: string
    buy_monero: string

    // Pagination
    page: string
    of: string

    // Overview
    total_balance: string
    no_transactions: string
    what_to_do: string
    date: string
    status: string
    processing: string
    unconfirmed: string
    complete: string
    incoming_monero: string
    outgoung_monero: string

    // Send
    send_to: string
    send_to_monero: string
    bitcoin_address: string
    monero_address: string
    address: string
    low_priority: string
    standard: string
    important: string
    low_priority_desc: string
    standard_desc: string
    important_desc: string
    not_enough: string
    dust_error: string
    bitcoin_network_fee: string
    monero_network_fee: string

    // Receive
    receive_only: string
    receive_only_monero: string
    wallet_address: string
    address_below: string

    // Settings
    show_seed: string
    show_seed_monero: string
    language: string
    currency: string
    exit_wallet: string

    // Buttons
    back_button: string
    restore_button: string
    next_button: string
    ok_button: string
    copy_button: string
    save_button: string

    // Notification
    notification_title: string

    // Exit wallet
    exit_text: string
    exit_are_you_sure: string
    exit_label_text: string
    exit_delete: string
}
