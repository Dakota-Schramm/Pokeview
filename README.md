A simple web application to search pokemon and display useful information.

Created with React Frontend and Flask Backend.

CSV from https://gist.github.com/armgilles/194bcff35001e7eb53a2a8b441e8b2c6

Figure out how to GREP TODO and add it to readme.
COMPLETED STORIES
    FRONTEND
        X1. The app should contain a browser router with a
        switch component
        X2. Inside the switch component, there should
        be routes that point to our API endpoints.
        -We can display components at each endpoint to conditionally
        render based on api endpoint.
        X3. On all pages, there is a footer (we just display this under the
        browser router to achieve this effect)
        X4. The footer contains basic authorship info. - Name - Contact Info
        X5. On the home component, there should be a centered search bar.
        X6. Upon typing, the suggested search bar displays a
        trie containing the current search bar input.
        X7. If the result is clicked on, it should complete the search
        for that result.
        X8. Otherwise, the result can be typed into the search bar.
        X9. If Pokemon doesn't exist, should show a page saying
        for invalid search.

    BACKEND
        X2. Middleware should be decorator that checks if is valid Pokemon. (NOT NEEDED ANYMORE)
        X3. If valid Pokemon, redirect to /:pokemon/:generation
        =================================================================================================
        ===================================================================================================================================================================================================

STORIES
FRONTEND

        10. For a correct input, page should show a layout with a slider at the
            top and two cards below it. For games where contests were available,
            an additional contest card should be below it.
        11. The slider should contain acroynyms to represent different generations.
        12. Moving the slider between acroynyms should change the content rendered
            inside the cards.
        13. The deck container class should take the input pokemon and the slider
            generation.
        14. Inside the deck container class is where the cards are rendered.
        15. Ususally two cards should be rendered inside the deck. If the
            generation is one that includes contests, it should render a third card.
        16. Inside the first card, there should be information on where to catch
            this Pokemon.
        17. If not available in this generation, it should display the easiest
            means to "trade up" to this Pokemon.
        18. At the bottom of the card, there should be a button to open a new tab
            to Serebii for this Pokemon.
        19. Inside the second card, there should be a Smogon competitive strategy
            for this Pokemon.
        20. At the bottom of the card, there should be a button to open a new tab
            to Smogon for this Pokemon.
        21. (PROBABLY WONT DO) Inside the third card, there should be a moveset for Pokemon
            contests.

    BACKEND
        1. Search /:pokemon will return a list of generations that pokemon is in.
            - On success:
                generations pokemon was in
            - On fail:
                pokemon not found: error page

        4. Search /:pokemon/:generation should run the webscrapers for
            the cards.
        5. Webscrapers should return key-value object with info to display
            in card.
                - info: {

                }
                - source
        6. The serebii webscraper should return a json containing info on how to
            catch POKEMON in GENERATION.
        7. The smogon webscraper should return a json containing info on a viable
            competitive set for POKEMON in GENERATION.
        8. If GENERATION is a valid contest generation, should return a json
            containing info for a contest moveset for POKEMON in GENERATION.
            Otherwise, should return "n/a"

Data flow should be -->
Search bar w/ Trie under for diff Pokemon names.
Searched Pokemon goes to backend
Valid --> send back generations pokemon available in
Invalid --> send error

Refactoring
Maybe add components to subfolders for organization?
