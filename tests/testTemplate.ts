import {suite, test} from '@testdeck/mocha';

function reversedSort (array: number[]) {
    let countRating = 1;
    for (let i = 0; i <= array.length - 2; i++) {
        if (array[i] >= array[i + 1]) {
            countRating++;
        }
    }
    return countRating;
}

@suite('test suite')
export class NoShare {

    @test
    'test'() {

        browser.url('https://cats-ui-eva.tcsbank.ru/rating');
        $('//table').waitForDisplayed({timeout: 10000});
        const ratingNames = $$('//td[contains(@class, "has-text-success")]');
        const antiRatingNames = $$('//td[contains(@class, "has-text-danger")]');

        const ratingValues = ratingNames.map(element => Number(element.getText()));
        const antiRatingValues = antiRatingNames.map(element => Number(element.getText()));

        expect(reversedSort(ratingValues)).toEqual(ratingValues.length);
        expect(reversedSort(antiRatingValues)).toEqual(antiRatingValues.length);

    }
}
