import Filter from 'bad-words'

// Hook
function useBadWordsFilter() {
    const filter = new Filter()
    var newBadWords = [
        'hora',
        'fitta',
        'kuk',
        'kuksugare',
        'horunge',
        'snippa',
        'sex',
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
