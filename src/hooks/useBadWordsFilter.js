import Filter from 'bad-words'

// Hook
function useBadWordsFilter() {
    const filter = new Filter()
    var newBadWords = [
        'hora',
        'h0ra',
        'h0r4',
        'hor4',
        'fitta',
        'fita',
        'f1tta',
        'f1tt4',
        'fitt4',
        'kuk',
        'cok',
        'c0k',
        'kuksugare',
        'kukzugare',
        'horunge',
        'h0runge',
        'h0rung3',
        'horung3',
        'snippa',
        'sn1ppa',
        'sn1pp4',
        'snipp4',
        'sex',
        's3x',
        'z3x',
        'zex',
        'bajs',
        'neger',
        'n3ger',
        'n3g3r',
        'neg3r',
    ]
    filter.addWords(...newBadWords)
    return filter
}

export default useBadWordsFilter
