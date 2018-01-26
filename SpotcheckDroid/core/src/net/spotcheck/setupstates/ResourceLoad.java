package net.spotcheck.setupstates;

import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.math.Interpolation;
import net.spotcheck.SpotCheck;
import net.spotcheck.states.Manager;

public class ResourceLoad extends Manager {

    Interpolation interpolater;
    float timer = 0;
    float lifetime = 1f;
    float elapsed = 0;

    float y;

    public ResourceLoad(SpotCheck reference){
        super(reference);

        interpolater = Interpolation.pow3;

        y = MainLink.HEIGHT/2;
    }

    public void update(float deltaTime){
        timer += deltaTime;

        while(timer < 2f){
            return;
        }

        elapsed += deltaTime;

        float progress = Math.min(1f, elapsed/lifetime);
        y = interpolater.apply(MainLink.HEIGHT/2, MainLink.HEIGHT/4 * 3, progress);
    }

    public void render(SpriteBatch batch){
        // Test render font
        batch.begin();

        MainLink.RenderFontCentered(batch, MainLink.fontMED, "SpotCheck", MainLink.WIDTH/2, y);

        batch.end();
    }

}
