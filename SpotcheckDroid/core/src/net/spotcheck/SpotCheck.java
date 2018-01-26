package net.spotcheck;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.freetype.*;
import com.badlogic.gdx.graphics.g2d.freetype.FreeTypeFontGenerator.*;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.g2d.GlyphLayout;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer;
import net.spotcheck.states.GameManager;
import net.spotcheck.states.SetupManager;

public class SpotCheck extends ApplicationAdapter {

    // Display resolution
    public int WIDTH;
    public int HEIGHT;

    // Main state machine
    public enum AppState { SETUP, PLAY };


    // Initial State
    AppState appState = AppState.SETUP;

    // Font resources
    FreeTypeFontGenerator generator;
    FreeTypeFontParameter parameter;
    public BitmapFont fontSML;
    public BitmapFont fontMED;
    public BitmapFont fontLRG;

    // Render frame
	SpriteBatch batch;
	ShapeRenderer shapeRenderer;

	// Managers
    SetupManager setupManager;
    GameManager gameManager;
	
	@Override
	public void create () {
	    WIDTH = Gdx.graphics.getWidth();
	    HEIGHT = Gdx.graphics.getHeight();

	    // Main initialization
		batch = new SpriteBatch();
        shapeRenderer = new ShapeRenderer();

        // Manager initialization (will also initialize substates)
        setupManager = new SetupManager(this);
        gameManager = new GameManager(this);

        // Font initialization
        generator  = new FreeTypeFontGenerator(Gdx.files.internal("fonts/Lato-Regular.ttf"));
        parameter = new FreeTypeFontParameter();
        parameter.size = 96;
        fontMED = generator.generateFont(parameter); // font size 12 pixels
		fontMED.setColor(Color.WHITE);
        fontSML = generator.generateFont(parameter); // font size 12 pixels
        fontSML.setColor(Color.WHITE);
        fontLRG = generator.generateFont(parameter); // font size 12 pixels
        fontLRG.setColor(Color.WHITE);
	}

	public void update() {
	    // Update Game State
        switch (appState){
            case SETUP:
                setupManager.update(Gdx.graphics.getDeltaTime());
                break;
            case PLAY:
                gameManager.update(Gdx.graphics.getDeltaTime());
                break;
            default:
                System.out.println("SOMETHING IS WRONG");
                System.exit(1);
        }
    }

	@Override
	public void render () {
	    // Perform calculations
	    update();

	    // Clear screen for rendering
		Gdx.gl.glClearColor(0, 0, 0, 1);
		Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);

		// Render gradient
		batch.begin();
		shapeRenderer.begin(ShapeRenderer.ShapeType.Filled);
		shapeRenderer.rect(
				0,
				0,
				WIDTH,
				HEIGHT,
                Color.valueOf("064140"),
                Color.valueOf("064140"),
                Color.valueOf("1F8664"),
                Color.valueOf("1F8664")
		);
		shapeRenderer.end();

		batch.end();

		// Render Game State
        switch (appState){
            case SETUP:
                setupManager.render(batch);
                break;
            case PLAY:
                gameManager.render(batch);
                break;
            default:
                System.out.println("SOMETHING IS WRONG");
                System.exit(1);
        }

	}

	public void RenderFontCentered(SpriteBatch batch, BitmapFont font, String text, float x, float y){
        GlyphLayout glyphLayout = new GlyphLayout();
        String item = text;

        glyphLayout.setText(font,item);
        font.draw(batch, glyphLayout, x - glyphLayout.width/2, y + glyphLayout.height/2);
    }

    public AppState getAppState() {
        return appState;
    }

    public void setAppState(AppState appState) {
        this.appState = appState;
    }

    @Override
	public void dispose () {
		batch.dispose();
		fontSML.dispose();
		fontMED.dispose();
		fontLRG.dispose();
	}
}
