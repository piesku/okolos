import {
    GL_ARRAY_BUFFER,
    GL_COLOR_BUFFER_BIT,
    GL_DEPTH_BUFFER_BIT,
    GL_ELEMENT_ARRAY_BUFFER,
    GL_FLOAT,
    GL_FRAMEBUFFER,
    GL_TRIANGLES,
    GL_UNSIGNED_SHORT,
} from "../../common/webgl.js";
import {Entity} from "../../common/world.js";
import {CameraDepth, CameraKind} from "../components/com_camera.js";
import {RenderKind} from "../components/com_render.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform | Has.Render;

export function sys_render_depth(game: Game, delta: number) {
    for (let camera_entity of game.Cameras) {
        let camera = game.World.Camera[camera_entity];
        switch (camera.Kind) {
            case CameraKind.Depth:
                render_depth(game, camera);
                break;
        }
    }
}

function render_depth(game: Game, camera: CameraDepth) {
    game.Gl.bindFramebuffer(GL_FRAMEBUFFER, camera.Target.Framebuffer);
    game.Gl.viewport(0, 0, camera.Target.Width, camera.Target.Height);
    game.Gl.clearColor(0, 0, 0, 1);
    game.Gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    let current_kind: RenderKind | null = null;
    let current_front_face = null;

    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) === QUERY) {
            let render = game.World.Render[ent];

            if (render.Kind !== current_kind) {
                switch (render.Kind) {
                    case RenderKind.Vertices:
                        // Skip rendering, RenderVertices doesn't cast shadow for now.
                        continue;
                    case RenderKind.Instanced:
                        current_kind = render.Kind;
                        game.Gl.useProgram(game.MaterialDepthInstanced.Program);
                        game.Gl.uniformMatrix4fv(
                            game.MaterialDepthInstanced.Locations.Pv,
                            false,
                            camera.Pv
                        );
                        break;
                    default:
                        current_kind = render.Kind;
                        game.Gl.useProgram(game.MaterialDepth.Program);
                        game.Gl.uniformMatrix4fv(game.MaterialDepth.Locations.Pv, false, camera.Pv);
                        break;
                }
            }

            if (render.FrontFace !== current_front_face) {
                current_front_face = render.FrontFace;
                game.Gl.frontFace(render.FrontFace);
            }

            draw_entity(game, ent);
        }
    }
}

function draw_entity(game: Game, entity: Entity) {
    let transform = game.World.Transform[entity];
    let render = game.World.Render[entity];

    switch (render.Kind) {
        case RenderKind.Vertices:
            break;
        case RenderKind.Instanced: {
            let material = game.MaterialDepthInstanced;
            game.Gl.uniformMatrix4fv(material.Locations.World, false, transform.World);

            game.Gl.bindBuffer(GL_ARRAY_BUFFER, render.Mesh.VertexBuffer);
            game.Gl.enableVertexAttribArray(material.Locations.VertexPosition);
            game.Gl.vertexAttribPointer(
                material.Locations.VertexPosition,
                3,
                GL_FLOAT,
                false,
                0,
                0
            );

            game.Gl.bindBuffer(GL_ARRAY_BUFFER, render.InstanceBuffer);
            game.Gl.enableVertexAttribArray(material.Locations.InstanceColumn1);
            game.Gl.vertexAttribPointer(
                material.Locations.InstanceColumn1,
                4,
                GL_FLOAT,
                false,
                4 * 16,
                0
            );
            game.Gl.vertexAttribDivisor(material.Locations.InstanceColumn1, 1);
            game.Gl.enableVertexAttribArray(material.Locations.InstanceColumn2);
            game.Gl.vertexAttribPointer(
                material.Locations.InstanceColumn2,
                4,
                GL_FLOAT,
                false,
                4 * 16,
                4 * 4
            );
            game.Gl.vertexAttribDivisor(material.Locations.InstanceColumn2, 1);
            game.Gl.enableVertexAttribArray(material.Locations.InstanceColumn3);
            game.Gl.vertexAttribPointer(
                material.Locations.InstanceColumn3,
                4,
                GL_FLOAT,
                false,
                4 * 16,
                4 * 8
            );
            game.Gl.vertexAttribDivisor(material.Locations.InstanceColumn3, 1);
            game.Gl.enableVertexAttribArray(material.Locations.InstanceColumn4);
            game.Gl.vertexAttribPointer(
                material.Locations.InstanceColumn4,
                4,
                GL_FLOAT,
                false,
                4 * 16,
                4 * 12
            );
            game.Gl.vertexAttribDivisor(material.Locations.InstanceColumn4, 1);

            game.Gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, render.Mesh.IndexBuffer);
            let instance_count = Math.floor(render.InstanceCount);
            game.Gl.drawElementsInstanced(
                GL_TRIANGLES,
                render.Mesh.IndexCount,
                GL_UNSIGNED_SHORT,
                0,
                instance_count
            );
            break;
        }
        default: {
            let material = game.MaterialDepth;

            game.Gl.uniformMatrix4fv(material.Locations.World, false, transform.World);
            game.Gl.bindBuffer(GL_ARRAY_BUFFER, render.Mesh.VertexBuffer);
            game.Gl.enableVertexAttribArray(material.Locations.VertexPosition);
            game.Gl.vertexAttribPointer(
                material.Locations.VertexPosition,
                3,
                GL_FLOAT,
                false,
                0,
                0
            );

            game.Gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, render.Mesh.IndexBuffer);
            game.Gl.drawElements(GL_TRIANGLES, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
            break;
        }
    }
}
